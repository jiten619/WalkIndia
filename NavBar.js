import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const Navbar = () => {
  const navigation = useNavigation();
  const [withdrawableCoins, setWithdrawableCoins] = useState(0);

  // Use async storage to retrieve the coins
  useEffect(() => {
    AsyncStorage.getItem('coins')
      .then(coins => {
        if (coins) {
          setWithdrawableCoins(parseInt(coins));
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity>
          {/* <Text style={styles.title}>Walking India</Text> */}
        </TouchableOpacity>
      </View>
      <View style={styles.walletContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('WalletPage')}>
          <Icon name="wallet" size={22} color={'#555'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('WalletPage')}>
          <Text style={styles.walletAmount}>{withdrawableCoins}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 30,
  },
  titleContainer: {
    flex: 1,
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletAmount: {
    marginLeft: 5,
    fontSize: 16,
  },
});

export default Navbar;