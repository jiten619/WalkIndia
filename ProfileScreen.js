import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Clipboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FooterBar from './footerbar';
import Navbar from './NavBar';

function ProfileScreen() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Call an API to retrieve the user ID here and set it using the setUserId function
    fetch('https://example.com/getUserId')
      .then(response => response.json())
      .then(data => {
        setUserId(data.userId);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleCopy = () => {
    Clipboard.setString(userId);
    alert('User Id copied to clipboard');
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.contentContainer}>
        <View style={styles.optionContainer}>
          <View style={styles.option}>
            <Text style={styles.optionText}>User ID</Text>
            <Text style={styles.optionText2}>{userId}</Text>
            <TouchableOpacity onPress={handleCopy}>
              <MaterialIcons name='content-copy' size={20}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Invite')}>
            <Text style={styles.optionText}>Invite Friend</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('InviteCode')}>
            <Text style={styles.optionText}>Input Invite Code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text style={styles.optionText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('FeedBack')}>
            <Text style={styles.optionText}>Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Version</Text><Text style={styles.optionText3}>1.0.0</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FooterBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbarContainer: {
    height: 60,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  optionContainer: {
    padding: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    flexGrow: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionText2: {
    flexGrow: 1,
    fontSize: 16,
  },
  optionText3: {
    flexGrow: 1,
    fontSize: 16,
    marginLeft: 200,
  },
  copyText: {
    color: '#007aff',
  },
  footerContainer: {
    height: 60,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
});

export default ProfileScreen;