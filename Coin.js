import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



const styles = StyleSheet.create({
  coin: {
    backgroundColor: 'gold',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});




const Coin = ({ x, y }) => {
  return (
    <TouchableOpacity style={[styles.coin, { left: x, top: y }]}>
      <Icon name="logo-bitcoin" size={16} color="black" />
    </TouchableOpacity>
  );
};

export default Coin;