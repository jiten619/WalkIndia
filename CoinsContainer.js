import React from 'react';
import { View, StyleSheet } from 'react-native';
import Coin from './Coin';

const CoinsContainer = ({ progress, onPressCoin }) => {
  const [coins, setCoins] = React.useState([]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (coins.length <= 10) {
        const newCoins = [...coins];
        const x = (Math.random() * 120) | 0;
        const y = (Math.random() * 120) | 0;
        newCoins.push({ x, y });
        setCoins(newCoins);
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [coins]);

  return (
    <View pointerEvents="none">
      {coins.map((coin, index) => (
        <Coin key={index} x={coin.x} y={coin.y} />
      ))}
    </View>
  );
};

export default CoinsContainer;