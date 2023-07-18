import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';

const bankIcon = require('./assets/bank.png');
const paypalIcon = require('./assets/paypal.png');
const googlePayIcon = require('./assets/google-pay.png');
const phonePayIcon = require('./assets/phone-pe.png');
const paytmIcon = require('./assets/paytm.png');

const WalletPage = () => {
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  // const [withdrawableCoins, setWithdrawableCoins] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  const [paypalEmail, setPaypalEmail] = useState('');

  const [googlePayNumber, setGooglePayNumber] = useState('');
  const [phonePayNumber, setPhonePayNumber] = useState('');
  const [paytmNumber, setPaytmNumber] = useState('');

  const withdrawableCoins = useSelector((state) => state.coins);

  //  // Use async storage to retrieve the coins
  //  useEffect(() => {
  //   AsyncStorage.getItem('coins')
  //     .then(coins => {
  //       if (coins) {
  //         setWithdrawableCoins(parseInt(coins));
  //       }
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  const handleWithdraw = () => {
    // Check if the withdraw amount is greater than or equal to 50,000
    if (withdrawAmount >= 5000000) {
      // Withdraw the amount and add it to the withdrawal history
      setWithdrawalHistory(prevState => [...prevState, {amount: withdrawAmount, channel: selectedChannel, date: new Date().toLocaleString()}]);
      // Update the withdrawable coins
      withdrawableCoins(prevState => prevState - withdrawAmount);
      // Reset the values
      setWithdrawAmount(0);
      setSelectedChannel(null);

      // Reset channel-specific input fields
      setAccountNumber('');
      setAccountHolderName('');
      setIfscCode('');
      setPaypalEmail('');
      setGooglePayNumber('');
      setPhonePayNumber('');
      setPaytmNumber('');
    }
  };

  const renderInputFields = () => {
    switch (selectedChannel) {
      case 'Bank Account':
        return (
          <>
            <Text style={styles.inputLabel}>Bank Account Number</Text>
            <TextInput
              placeholder="Enter bank account number"
              keyboardType="number-pad"
              value={accountNumber}
              onChangeText={setAccountNumber}
              style={styles.channelInput}
            />
            <Text style={styles.inputLabel}>Account Holder Name</Text>
            <TextInput
              placeholder="Enter account holder name"
              value={accountHolderName}
              onChangeText={setAccountHolderName}
              style={styles.channelInput}
            />
            <Text style={styles.inputLabel}>IFSC Code</Text>
            <TextInput
              placeholder="Enter IFSC code"
              value={ifscCode}
              onChangeText={setIfscCode}
              style={styles.channelInput}
            />
          </>
        );
      case 'Paypal Account':
        return (
          <>
            <Text style={styles.inputLabel}>Paypal Email</Text>
            <TextInput
              placeholder="Enter Paypal email"
              keyboardType="email-address"
              value={paypalEmail}
              onChangeText={setPaypalEmail}
              style={styles.channelInput}
            />
          </>
        );
      case 'Google Pay':
        return (
          <>
            <Text style={styles.inputLabel}>Google Pay Number/UPId</Text>
            <TextInput
              placeholder="Enter Google Pay number/UPId"
              keyboardType="phone-pad"
              value={googlePayNumber}
              onChangeText={setGooglePayNumber}
              style={styles.channelInput}
            />
          </>
        );
      case 'Phone Pay':
        return (
          <>
            <Text style={styles.inputLabel}>Phone Pay Number/UPId</Text>
            <TextInput
              placeholder="Enter Phone Pay number/UPId"
              keyboardType="phone-pad"
              value={phonePayNumber}
              onChangeText={setPhonePayNumber}
              style={styles.channelInput}
            />
          </>
        );
      case 'Paytm':
        return (
          <>
            <Text style={styles.inputLabel}>Paytm Number/UPId</Text>
            <TextInput
              placeholder="Enter Paytm number/UPId"
              keyboardType="phone-pad"
              value={paytmNumber}
              onChangeText={setPaytmNumber}
              style={styles.channelInput}
            />
          </>
        );
      default:
        return null;
    }
  };

  const renderWithdrawalChannelIcon = (channel) => {
    switch (channel) {
      case 'Bank Account':
        return <Image source={bankIcon} style={styles.channelIcon} />;
      case 'Paypal Account':
        return <Image source={paypalIcon} style={styles.channelIcon} />;
      case 'Google Pay':
        return <Image source={googlePayIcon} style={styles.channelIcon} />;
      case 'Phone Pay':
        return <Image source={phonePayIcon} style={styles.channelIcon} />;
      case 'Paytm':
        return <Image source={paytmIcon} style={styles.channelIcon} />;
      default:
        return null;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {/* Show the header and withdrawable coins */}
        <View style={styles.headerContainer}>
          <View style={styles.withdrawableCoinsContainer}>
            <Text style={styles.withdrawableCoinsText}>Withdrawable:</Text>
            <Text style={styles.withdrawableCoinsAmount}>{withdrawableCoins}</Text>
          </View>
          {/* <TouchableOpacity onPress={() => console.log(withdrawalHistory)}>
            <Text style={styles.withdrawalHistoryButton}>History</Text>
          </TouchableOpacity> */}
        </View>

        {/* Show the withdraw input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Withdraw Amount</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputPrefix}>INR</Text>
            <TextInput
              placeholder="Enter amount"
              keyboardType="number-pad"
              value={withdrawAmount.toString()}
              onChangeText={setWithdrawAmount}
              style={styles.inputAmount}
            />
          </View>
          <Text style={styles.inputSubText}>Minimum withdraw limit is 50,00,000 coins</Text>
          <Text style={styles.inputSubText}>50,00,000 coins = 7500 Rupees</Text>
        </View>

        {/* Show the channel selection */}
        <View style={styles.channelContainer}>
          <Text style={styles.inputLabel}>Select withdrawal channel</Text>
          <View style={styles.channelIconsContainer}>
            <TouchableOpacity onPress={() => setSelectedChannel('Bank Account')}>
              {renderWithdrawalChannelIcon('Bank Account')}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedChannel('Paypal Account')}>
              {renderWithdrawalChannelIcon('Paypal Account')}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedChannel('Google Pay')}>
              {renderWithdrawalChannelIcon('Google Pay')}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedChannel('Phone Pay')}>
              {renderWithdrawalChannelIcon('Phone Pay')}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedChannel('Paytm')}>
              {renderWithdrawalChannelIcon('Paytm')}
            </TouchableOpacity>
          </View>
        </View>

        {/* Show channel-specific input fields */}
        {renderInputFields()}

        {/* Show the cash out button */}
        <TouchableOpacity
          onPress={handleWithdraw}
          disabled={withdrawAmount < 5000000 || !selectedChannel}
          style={[
            styles.cashOutButton,
            withdrawAmount < 5000000 || !selectedChannel ? styles.disabledCashOutButton : {},
          ]}
        >
          <Text style={styles.cashOutButtonText}>Cash Out</Text>
        </TouchableOpacity>

        {/* Show the withdrawal history */}
        <View style={styles.withdrawalHistoryContainer}>
          <Text style={styles.withdrawalHistoryLabel}>Withdrawal History</Text>
          {withdrawalHistory.map((withdrawal, index) => (
            <View key={index} style={styles.withdrawalHistoryItem}>
              <Text style={styles.withdrawalHistoryAmount}>- {withdrawal.amount} coins</Text>
              <View style={styles.withdrawalHistoryDetails}>
                <Text style={styles.withdrawalHistoryDate}>{withdrawal.date}</Text>
                <Text style={styles.withdrawalHistoryChannel}>{withdrawal.channel}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: '#F3FCFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F3FCFF',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 20,
  },
  withdrawableCoinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  withdrawableCoinsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#414141',
  },
  withdrawableCoinsAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
    marginLeft: 10,
  },
  withdrawalHistoryButton: {
    fontSize: 16,
    color: '#0076FF',
    textDecorationLine: 'underline',
  },
  inputContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#414141',
    marginVertical: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  inputPrefix: {
    fontSize: 16,
    marginRight: 10,
    paddingBottom: 2,
    color: '#414141',
  },
  inputAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
    paddingBottom: 2,
    color: '#414141',
  },
  inputSubText: {
    fontSize: 14,
    color: 'black',
    marginTop: 10,
  },
  channelContainer: {
    paddingTop: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  channelIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  channelIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  channelInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  cashOutButton: {
    backgroundColor: '#19B5FE',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 30,
  },
  disabledCashOutButton: {
    backgroundColor: '#ccc',
  },
  cashOutButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  withdrawalHistoryContainer: {
    marginTop: 20,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  withdrawalHistoryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#414141',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  withdrawalHistoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 5,
  },
  withdrawalHistoryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginRight: 10,
  },
  withdrawalHistoryDetails: {
    flex: 1,
  },
  withdrawalHistoryDate: {
    fontSize: 16,
    color: '#414141',
  },
  withdrawalHistoryChannel: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});

export default WalletPage;