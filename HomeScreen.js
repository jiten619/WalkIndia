import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Pedometer } from 'expo-sensors';
import TodayHealthDataContainer from './healthContainer';
import Navbar from './NavBar';
import FooterBar from './footerbar';
import CircularProgress from 'react-native-circular-progress-indicator';
import store from './store';


const backgroundImage = { uri: 'https://img.freepik.com/premium-photo/young-man-runner-running-running-road-city-park_41380-381.jpg?w=740' };
const coinImage1 = require('./assets/diamond.png');
const coinImage2 = require('./assets/coin2.png');
const coinImage3 = require('./assets/giftbox.png');


const HomeScreen = () => {
  const [PedometerAvailability, setPedometerAvailability] = useState('')
  const [stepCount, updateStepCount] = useState(0);
  const [disappearedCoins, setDisappearedCoins] = useState([]);

  useEffect(()=> {
    subscribe();
  }, [])

  subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      updateStepCount(result.steps)
    })

    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometerAvailability(String(result));
      } , 
      (error) => {
        setPedometerAvailability(error);
      }
    );
  }

  const onCoinPress = (index) => {
    const randomCoins = Math.floor(Math.random() * (10000 - 0.1 + 1) + 0.1); // Generate a random number of coins between 1 and 100
    console.log(`Earned ${randomCoins} coins as a reward for pressing the coin!`);
    store.dispatch({ type: 'ADD_COINS', amount: randomCoins });
    setDisappearedCoins([...disappearedCoins, index]);
    setTimeout(() => {
      setDisappearedCoins(disappearedCoins.filter((i) => i !== index));
    }, 5000);
  };

  const collectReward = () => {
    const percentageOfTarget = stepCount/6500; // Calculate the percentage of the total steps target reached by the user so far
    const randomCoins = Math.floor(Math.random() * (10000 - 0.1 + 1) + 0.1); // Generate a random number of coins
    const collectedReward = Math.round(percentageOfTarget * randomCoins); // Calculate the rewards based on the percentage of total steps reached
    console.log(`Collected ${collectedReward} coins as a reward!`);
    store.dispatch({ type: 'ADD_COINS', amount: collectedReward });
  };

  const coinsPositions = Array.from({ length: 8 }, (_, index) => {
    const angle = Math.PI * (index + 1) / 9;
    const x = 135 * Math.cos(angle);
    const y = 175 * Math.sin(angle);
    const imageIndex = index % 3; // choose which image to use based on the index
    return { left: 140 + x, bottom: y, imageIndex };
  });

  

  return (
    <View  style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage} >
        <Navbar />
        <View style={styles.progressContainer}> 
          <CircularProgress 
            value={stepCount}
            maxValue={6500}
            radius={80}
            textColor={'#ECF0F1'}
            activeStrokeColor={'#FDC702'}
            inActiveStrokeColor={'white'}
            inActiveStrokeOpacity={0.5}
            inActiveStrokeWidth={40}
            activeStrokeWidth={40}
            title={'Steps'}
            titleColor={'#ECF0F1'}
            style={{
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 5,
            }}
          />
  
          <View style={styles.coinContainer}>
            {coinsPositions.map((coinPosition, index) => {
              if (disappearedCoins.includes(index)) { // if the coin has disappeared, don't render it
                return null;
              }
              return (
                <TouchableOpacity 
                  key={index} 
                  style={[styles.coin, coinPosition]} 
                  onPress={() => onCoinPress(index)}>
                    <View style={styles.bubble}>
                      <Image source={[coinImage1, coinImage2, coinImage3][coinPosition.imageIndex]} style={{ width: '100%', height: '100%' }} />
                    </View>
                </TouchableOpacity>
              );
            })}
          </View>
  
        </View>
  
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            style={styles.rewardButton}
            onPress={collectReward}>
            <Text style={styles.rewardButtonText}>Claim Coins</Text>
          </TouchableOpacity>
        </View>
  
        <TodayHealthDataContainer />
        <FooterBar/>
      </ImageBackground>
    </View> 
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aff0ba',
  },
  bubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // semi-transparent white
    borderRadius: 50,
    padding: 3,
    borderWidth: 1,
    borderColor: '#fff',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  progressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardButton: {
    paddingVertical: 5,
    paddingHorizontal: 50,
    backgroundColor: '#2196f3',
    borderRadius: 15,
    marginBottom: -30,
  },
  rewardButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  coinContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    alignItems: 'center',
  },
  coin: {
    width: 40,
    height: 40,
    position: 'absolute',
  },
});

export default HomeScreen;