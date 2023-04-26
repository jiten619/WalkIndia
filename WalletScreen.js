import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';



const WalletPage = () => {
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [withdrawableCoins, setWithdrawableCoins] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  const [paypalEmail, setPaypalEmail] = useState('');

  const [googlePayNumber, setGooglePayNumber] = useState('');
  const [phonePayNumber, setPhonePayNumber] = useState('');
  const [paytmNumber, setPaytmNumber] = useState('');
  

  const handleWithdraw = () => {
    // Check if the withdraw amount is greater than or equal to 50,000
    if (withdrawAmount >= 50000) {
      // Withdraw the amount and add it to the withdrawal history
      setWithdrawalHistory(prevState => [...prevState, {
        amount: withdrawAmount,
        channel: selectedChannel,
        date: new Date().toLocaleString(),
      }]);
      // Update the withdrawable coins
      setWithdrawableCoins(prevState => prevState - withdrawAmount);
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
  }

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
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {/* Show the history and withdrawable coins */}
        <View style={styles.headerContainer}>
          <View style={styles.withdrawableCoinsContainer}>
            <Text style={styles.withdrawableCoinsText}>Withdrawable:</Text>
            <Text style={styles.withdrawableCoinsAmount}>{withdrawableCoins}</Text>
          </View>
          <TouchableOpacity onPress={() => console.log(withdrawalHistory)}>
            <Text style={styles.withdrawalHistoryButton}>History</Text>
          </TouchableOpacity>
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
          <Text style={styles.inputSubText}>Minimum withdraw limit is 50,000 coins</Text>
        </View>

        {/* Show the channel selection */}
        <View style={styles.channelContainer}>
        <Text style={styles.inputLabel}>Select channel</Text>
          <Picker
            selectedValue={selectedChannel}
            onValueChange={channel => setSelectedChannel(channel)}
            style={styles.picker}
          >
            <Picker.Item label="Select Withdrawal Channel" value={null} />
            <Picker.Item label="Bank Account" value="Bank Account" />
            <Picker.Item label="Paypal Account" value="Paypal Account" />
            <Picker.Item label="Google Pay" value="Google Pay" />
            <Picker.Item label="Phone Pay" value="Phone Pay" />
            <Picker.Item label="Paytm" value="Paytm" />
          </Picker>
        </View>

        {/* Show channel-specific input fields */}
        {renderInputFields()}

        {/* Show the cash out button */}
        <TouchableOpacity
          onPress={handleWithdraw}
          disabled={withdrawAmount < 50000 || !selectedChannel}
          style={[
            styles.cashOutButton,
            withdrawAmount < 50000 ? styles.disabledCashOutButton : {},
            !selectedChannel ? styles.disabledCashOutButton : {},
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
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#5FA38B',
    paddingHorizontal: 20,
    paddingTop: 40,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#414141',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
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
    color: '#fff',
    marginTop: 10,
  },
  channelContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  cashOutButton: {
    backgroundColor: '#0076FF',
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
  },
  withdrawalHistoryAmount: {
    fontSize: 16,
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