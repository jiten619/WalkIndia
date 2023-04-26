import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity,ImageBackground } from 'react-native';
import { Pedometer } from 'expo-sensors';
import TodayHealthDataContainer from './healthContainer';
import Navbar from './NavBar';
import FooterBar from './footerbar';
import CircularProgress from 'react-native-circular-progress-indicator';
import store from './store';


const backgroundImage = { uri: 'https://img.freepik.com/premium-photo/young-man-runner-running-running-road-city-park_41380-381.jpg?w=740' };


const HomeScreen = () => {
  const [PedometerAvailability, setPedometerAvailability] = useState('')
  const [stepCount, updateStepCount] = useState(0);

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

  const collectReward = () => {
    const percentageOfTarget = stepCount/6500; // Calculate the percentage of the total steps target reached by the user so far
    const randomCoins = Math.floor(Math.random() * (1000 - 0.1 + 1) + 0.1); // Generate a random number of coins
    const collectedReward = Math.round(percentageOfTarget * randomCoins); // Calculate the rewards based on the percentage of total steps reached
    console.log(`Collected ${collectedReward} coins as a reward!`);
    store.dispatch({ type: 'ADD_COINS', amount: collectedReward });
  };


  return (
    <View  style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage} >

      <Navbar />
      <View style={styles.progressContainer}> 
      <CircularProgress 
         value= {stepCount}
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
});

export default HomeScreen;