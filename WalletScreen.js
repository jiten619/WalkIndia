import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, value } from 'react-native';

const WalletPage = () => {
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [withdrawableCoins, setWithdrawableCoins] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState('');

  const handleWithdraw = () => {
    // withdraw the amount and add it to the withdrawal history
    setWithdrawalHistory(prevState => [...prevState, withdrawAmount]);
    // update the withdrawable coins
    setWithdrawableCoins(prevState => prevState - withdrawAmount);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* showing a container which shows the withdrawable coins and a history */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, }}>
        <View>
          <Text style={{ fontSize: 24 }}>Withdrawable:</Text>
          <Text style={{ fontSize: 18 }}>{withdrawableCoins}</Text>
        </View>
        <TouchableOpacity onPress={() => console.log(withdrawalHistory)}>
          <Text style={{ fontSize: 18, textDecorationLine: 'underline' }}>History</Text>
        </TouchableOpacity>
      </View>

      {/* showing a container which shows the input option where user can enter the coins for withdraw */}
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 24 }}>Withdraw Amount</Text>
        <Text style={{ fontSize: 16, color: '#aaa' }}>Minimum limit for withdraw is 50 lacs</Text>
        <TextInput
          placeholder="Enter amount"
          keyboardType="numeric"
          value={withdrawAmount}
          onChangeText={setWithdrawAmount}
          style={{ width: '80%', borderBottomWidth: 1, borderBottomColor: '#ddd', fontSize: 20, marginVertical: 16 }}
        />
      </View>

      {/* showing a container which shows the input option when the user click it it will show a list of options */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24 }}>Select Channel for Withdrawal</Text>
        <TouchableOpacity onPress={() => setSelectedChannel('Bank Account')}>
          <Text style={{ fontSize: 18, marginVertical: 16 }}>Bank Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedChannel('Paypal Account')}>
          <Text style={{ fontSize: 18, marginVertical: 16 }}>Paypal Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedChannel('Google Pay')}>
          <Text style={{ fontSize: 18, marginVertical: 16 }}>Google Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedChannel('Phone Pay')}>
          <Text style={{ fontSize: 18, marginVertical: 16 }}>Phone Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedChannel('Paytm')}>
          <Text style={{ fontSize: 18, marginVertical: 16 }}>Paytm</Text>
        </TouchableOpacity>
      </View>

      {/* showing a button for cash out the money */}
      <TouchableOpacity
        onPress={handleWithdraw}
        disabled={withdrawAmount < 500000}
        style={{
          backgroundColor: withdrawAmount < 500000 ? '#ccc' : '#000',
          padding: 16,
          borderRadius: 5,
          alignItems: 'center',
          marginHorizontal: 20,
          marginTop: 32,
        }}
      >
        <Text style={{ fontSize: 20, color: '#fff' }}>Cash Out</Text>
      </TouchableOpacity>
    </View>
  );
}

export default WalletPage;