import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const Navbar = () => {
  const navigation = useNavigation();
  return (
    
    <View style={styles.container}>
      <View style={styles.titleContainer}>
      <TouchableOpacity>
        <Text style={styles.title}>Walking India</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.walletContainer}>
      <TouchableOpacity onPress={() =>  navigation.navigate('WalletPage')}>
        <Icon name="wallet-outline" size={22}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>  navigation.navigate('WalletPage')}>
        <Text style={styles.walletAmount}>0.00</Text>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
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