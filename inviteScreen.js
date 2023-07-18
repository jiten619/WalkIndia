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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { nanoid } from 'nanoid/non-secure';


const InviteScreen = () => {
  const route = useRoute();
  const [inviteCode, setInviteCode] = useState("");
  const [invitedFriends, setInvitedFriends] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0); // 250 coins per user x 5 invited friends


  useEffect(() => {
    // Update the values with the passed navigation parameters
    if (route.params && route.params.invitedFriends && route.params.earnedCoins) {
      setInvitedFriends(route.params.invitedFriends);
      setEarnedCoins(route.params.earnedCoins);
    }

    // Rest of the code...
  }, [route]);

 

  // const updateInviteStatus = async (inviteCode) => {
  //   try {
  //     // Make an API request to verify the invite code and update values
  //     const response = await fetch('https://your-api.com/invite/verify', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         inviteCode: inviteCode,
  //       }),
  //     });
  
  //     if (response.ok) {
  //       // If the API request is successful, update the values in the state
  //       const data = await response.json();
  //       const { invitedFriends, earnedCoins } = data;
  //       setInvitedFriends(invitedFriends);
  //       setEarnedCoins(earnedCoins);
  //       alert('Invite code verified successfully!');
  //     } else {
  //       // If the API request fails, handle the error
  //       throw new Error('Failed to verify invite code');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert('Error verifying invite code. Please try again.');
  //   }
  // };
  

 

  const shareApp = () => {
    Share.share({
      message: 'Download this awesome app by clicking on this link: https://expo.dev/artifacts/eas/p4e1ua7hNfm3XtpZKcs9qe.apk',
      url: 'https://expo.dev/artifacts/eas/p4e1ua7hNfm3XtpZKcs9qe.apk',
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

  const generateInviteCode = () => {
    const newInviteCode = nanoid(6).toUpperCase();
  
    // Send a fetch request to store the invite code in the database
    fetch('https://steadily-lucky-burro.ngrok-free.app/inviteCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inviteCode: newInviteCode }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response if needed
        console.log('Invite code stored in the database:', data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch request
        console.error('Error storing invite code:', error);
      });
  
    // AsyncStorage.setItem('inviteCode', newInviteCode); // Store invite code in AsyncStorage
  };
  useEffect(() => {
    fetch('https://steadily-lucky-burro.ngrok-free.app/inviteCode')
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.length > 0 && data[0].inviteCode) {
          setInviteCode(data[0].inviteCode);
        } else {
          generateInviteCode();
        }
      })
      .catch((error) => {
        console.error('Error retrieving invite code:', error);
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
            <Text style={styles.earningsDetail1}> 1-5 friends: 150 coins per user</Text>
            <Text style={styles.earningsDetail2}> 6-10 friends: 200 coins per user</Text>
            <Text style={styles.earningsDetail3}> 11-15 friends: 250 coins per user</Text>
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