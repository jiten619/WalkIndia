import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  ScrollView,
  Clipboard,
} from 'react-native';
// import  { Clipboard }  from '@react-native-clipboard/clipboard';
import Navbar from './NavBar';
import FooterBar from './footerbar';
import AsyncStorage from '@react-native-community/async-storage';



const InviteScreen = () => {
  const [inviteCode, setInviteCode] = useState("");
  const [invitedFriends, setInvitedFriends] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0); // 250 coins per user x 5 invited friends

 

  const inviteFriend = useCallback(async () => {
    try {
      // make API request to invite friend
      const response = await fetch('https://your-api.com/user/invite', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token, // replace with your authorization token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          friendEmail: 'friend@example.com', // replace with actual friend's email
        }),
      });
      const data = await response.json();
      const { coinsEarned, totalInvitedFriends } = data;
      setInvitedFriends(totalInvitedFriends);
      setEarnedCoins(coinsEarned);
    } catch (error) {
      console.error(error);
    }
  }, []);

 

  const shareApp = () => {
    Share.share({
      message: 'Download this awesome app by clicking on this link: [add your app store/play store link here]',
      url: '[add your app store/play store link here]',
      title: 'Invite your friends to use this app!',
    });
  }

  const copyInviteCode = () => {
    try {
      Clipboard.setString(inviteCode);
      alert('Invite code copied to clipboard!');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // Check if a user ID is already stored in AsyncStorage
    AsyncStorage.getItem('inviteCode').then((storedinviteCode) => {
      if (storedinviteCode != null) {
        setInviteCode(storedinviteCode);
      } else {
        // Generate a new random user ID and store it in AsyncStorage
        const newInviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        AsyncStorage.setItem('inviteCode', newInviteCode.toString());
        setInviteCode(newInviteCode.toString());
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Top invite button */}
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.topButton} onPress={shareApp}>
          <Text style={styles.buttonText}>Invite Friends To Earn More</Text>
        </TouchableOpacity>

        {/* Invite code */}
        <View style={styles.inviteCodeContainer}>
          <Text style={styles.inviteCode}>  invite Code:      {inviteCode}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={copyInviteCode}>
            <Text style={{ color: 'white' }}>Copy</Text>
          </TouchableOpacity>
        </View>

        {/* Invitation earning information */}
        <Text style={styles.earningsText}>Invitation Earnings:</Text>
        <View style={styles.earningsContainer}>
          <View>
            <Text style={styles.earningsDetail1}>Invite 1-2 friends: 150 coins per user</Text>
            <Text style={styles.earningsDetail2}>Invite 3-5 friends: 200 coins per user</Text>
            <Text style={styles.earningsDetail3}>Invite 6-10 friends: 250 coins per user</Text>
          </View>
        </View>

        {/* Earnings summary */}
        <View style={styles.earnersContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginRight: 10, fontWeight: 'bold' }}>Invited Friends:</Text>
            <Text style={{ fontWeight: 'bold', marginLeft: 171 }}>{invitedFriends}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ marginRight: 10, fontWeight: 'bold' }}>Coins Earned:</Text>
            <Text style={{ fontWeight: 'bold', marginLeft: 180 }}>{earnedCoins}</Text>
          </View>
        </View>

        {/* Random rules */}
        <Text style={styles.rulesText}>Rules: <Text style={styles.rule}>Rules for How to invite friends.</Text></Text>
        <View style={styles.rulesContainer}>
          <Text style={styles.rule}>1. To invite your friend click on the invite button.</Text>
          <Text style={styles.rule}>2. After that choose the method for how to invite friend.</Text>
          <Text style={styles.rule}>3. For every successfull invite your are getting coins.</Text>
          <Text style={styles.rule}>4. You can invite your friend via your invite code.</Text>
          <Text style={styles.rule}>5. When your Friend install the app from Playstore or Appstore then paste that invite code in its place.</Text>
          <Text style={styles.rule}>6. To getting more coins you'll get to invite more friends.</Text>
        </View>
      </ScrollView>

        <FooterBar />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBDFEA',
  },
  topButton: {
    backgroundColor: '#02B2FE',
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  inviteCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#E6E6E6',
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#7D6C95',
    marginLeft: 10,
    marginRight: 10,
  },
  inviteCode: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  copyButton: {
    backgroundColor: '#07CFCF',
    padding: 10,
    borderRadius: 50,
  },
  earningsContainer: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#ACB1D6',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  earningsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  earningsDetail1: {
    fontSize: 16,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 30,
  },
  earningsDetail2: {
    fontSize: 16,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 30,
  },
  earningsDetail3: {
    fontSize: 16,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 30,
  },
  earnersContainer: {
    backgroundColor: '#F2F2F2',
    borderColor: '#ACB1D6',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 4,
    borderRadius: 15,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  rulesContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#ACB1D6',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  rulesText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  rule: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default InviteScreen;