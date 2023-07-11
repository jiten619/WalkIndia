import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen';

const InviteCodeScreen = () => {
  const navigation = useNavigation();
  const [inviteCode, setInviteCode] = useState('');

  // Function to handle submit button press
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.1.5:3000/inviteCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inviteCode,
        }),
      });
  
      const result = await response.json();
      console.log('result:', result);
  
      if (result.isValid) {
        // Navigate to the next screen
        // You can use any navigation library of your choice here
        alert('You have successfully verified the invite code.');
        navigation.navigate('Home', {
          invitedFriends: result.invitedFriends,
          earnedCoins: result.earnedCoins,
        }); // Assuming you have a navigation prop available
      } else {
        // Show error message to user
        alert('Invalid invite code. Please check and try again.');
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Invite Code:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Invite Code"
          value={inviteCode}
          onChangeText={setInviteCode}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.rulesContainer}>
        <Text style={styles.rules}>
          Please enter the invite code exactly as it was sent to you. The invite code is case sensitive and should not contain any extra spaces or characters.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rulesContainer: {
    marginTop: 20,
  },
  rules: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  }
});

export default InviteCodeScreen;