import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, Animated, Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import TodayHealthDataContainer from './healthContainer';
import Navbar from './NavBar';
import FooterBar from './footerbar';
import CircularProgress from 'react-native-circular-progress-indicator';
import { store } from './store';
import { updateStepCount } from "./reducer";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const backgroundImage = { uri: 'https://img.freepik.com/premium-photo/young-man-runner-running-running-road-city-park_41380-381.jpg?w=740' };
const coinImage1 = require('./assets/diamond.png');
const coinImage2 = require('./assets/coin2.png');
const coinImage3 = require('./assets/giftbox.png');
const coinsPositions = Array.from({ length: 8 }, (_, index) => {
  const angle = Math.PI * (index + 1) / 9;
  const x = 135 * Math.cos(angle);
  const y = 175 * Math.sin(angle);
  const imageIndex = index % 3; // choose which image to use based on the index
  return { left: 140 + x, bottom: y, imageIndex };
});

let coinAnimationDuration = 1000; // duration of a single animation cycle
const coinAnimationDelay = 500; // delay between two animations

const HomeScreen = () => {
  const [accelerometerAvailability, setAccelerometerAvailability] = useState('');
  const [lastStepTime, setLastStepTime] = useState(null);
  const [accelerationThreshold, setAccelerationThreshold] = useState(0.0005);
  const [lastAcceleration, setLastAcceleration] = useState(0);
  const [disappearedCoins, setDisappearedCoins] = useState([]);
  const animatedValues = Array.from({ length: 8 }, () => new Animated.Value(0)); // initialize animated values
  const { stepCount, coins } = store.getState();

  useEffect(() => {
    store.subscribe(() => {
      const { stepCount: newStepCount } = store.getState();
      if (newStepCount !== stepCount) {
        setDisappearedCoins([]);
      }
    });
    subscribeAccelerometer();
  }, []);
  

  const subscribeAccelerometer = () => {
    Accelerometer.setUpdateInterval(5000); // Set the update interval for accelerometer data
  
    // Constants
    // const accelerationThreshold = 1.5; // Adjust the acceleration threshold as needed
    const peakDetectionWindow = 100; // Adjust the peak detection window as needed
    const peakThreshold = 1.0; // Adjust the peak threshold as needed
    const peakCooldown = 200; // Adjust the peak cooldown period as needed
  
    // Variables
    let accelerationData = []; // Store recent acceleration values for peak detection
    let lastStepTime = Date.now(); // Store the timestamp of the last step
    let stepCount = 0; // Store the step count
    let isWalking = false; // Store the walking state
    let lastPeakIndex = -1; // Store the index of the last detected peak
  
    // Step detection logic
    const detectSteps = () => {
      const now = Date.now();
      const timeDiff = now - lastStepTime;
      // console.log(timeDiff);
  
      // Perform peak detection within the specified window
      const peaks = detectPeaks(accelerationData, peakThreshold);
      // console.log(peaks);
  
      if (peaks.length > 0 && timeDiff > peakCooldown) {
        // Count only unique peaks
        const uniquePeaks = peaks.filter((peak) => peak.startIndex > lastPeakIndex);
        lastPeakIndex = peaks.length > 0 ? peaks[peaks.length - 1].startIndex : -1;
        // console.log(uniquePeaks);
  
        // Increment the step count and update the last step time
        stepCount += uniquePeaks.length;
        lastStepTime = now;
        dispatchStepCount(stepCount);
      }
    };
  
    // Peak detection logic
    const detectPeaks = (data, threshold) => {
      const peaks = [];
      let isPeak = false;
      let peakStartIndex = 0;
  
      for (let i = 1; i < data.length - 1; i++) {
        const prevAcceleration = data[i - 1];
        const currentAcceleration = data[i];
        const nextAcceleration = data[i + 1];
  
        if (currentAcceleration > prevAcceleration && currentAcceleration > nextAcceleration) {
          // Potential peak found
          if (currentAcceleration > threshold) {
            // Check if it is a valid peak
            if (!isPeak) {
              peakStartIndex = i;
              isPeak = true;
            }
          }
        } else if (isPeak && currentAcceleration < threshold) {
          // Peak ended
          const peakValue = Math.max(...data.slice(peakStartIndex, i + 1));
          peaks.push({ value: peakValue, startIndex: peakStartIndex });
          isPeak = false;
        }
      }
  
      return peaks;
    };
  
    // Accelerometer data listener
    Accelerometer.addListener(({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      // console.log(acceleration);
  
      if (isWalking) {
        if (acceleration < accelerationThreshold) {
          // User has stopped walking
          isWalking = false;
        } else {
          // Store acceleration data for peak detection
          accelerationData.push(acceleration);
  
          if (accelerationData.length > peakDetectionWindow) {
            // Remove oldest acceleration data
            accelerationData.shift();
          }
  
          detectSteps();
        }
      } else {
        if (acceleration >= accelerationThreshold) {
          // User has started walking
          isWalking = true;
          accelerationData = [acceleration]; // Clear previous data and start with new data point
        }
      }
    });
  
    // Check if the accelerometer is available
    Accelerometer.isAvailableAsync().then(
      (result) => {
        setAccelerometerAvailability(String(result));
        console.log('Accelerometer is available');
      },
      (error) => {
        setAccelerometerAvailability(error);
        console.error('Accelerometer is unavailable:', error);
      }
    );
  };
  
  const dispatchStepCount = (newStepCount) => {
    store.dispatch(updateStepCount(newStepCount));
    const today = new Date().toISOString().substring(0, 10);
    // create a POST request to the server to store today's step count with the "today" query parameter
    fetch('https://steadily-lucky-burro.ngrok-free.app/steps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: today, steps: newStepCount }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update step count on the server');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Steps data:', data);
      })
      .catch((error) => console.error(error));
  };

  const onCoinPress = async (index) => {
    const randomCoins = Math.floor(Math.random() * (10000 - 0.1 + 1) + 0.1);
    console.log(`Earned ${randomCoins} coins as a reward for pressing the coin!`);
    store.dispatch({ type: 'ADD_COINS', amount: randomCoins });
    setDisappearedCoins([...disappearedCoins, index]);
    setTimeout(() => {
      setDisappearedCoins(disappearedCoins.filter((i) => i !== index));
    }, 5000);

    // try {
    //   const response = await fetch('http://192.168.1.5:3000/coins', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ coins: randomCoins })
    //   });
    //   if (!response.ok) {
    //     throw new Error('Failed to add coins to the server');
    //   }
    //   const responseJson = await response.json();
    //   console.log('Coins added to the server:', responseJson);
    // } catch (error) {
    //   console.error('Failed to add coins to the server:', error);
    // }
  };

  const collectReward = async () => {
    const percentageOfTarget = stepCount / 6500;
    const randomCoins = Math.floor(Math.random() * (10000 - 0.1 + 1) + 0.1);
    const collectedReward = Math.round(percentageOfTarget * randomCoins);
    console.log(`Collected ${collectedReward} coins as a reward!`);

    // try {
    //   const response = await fetch('http://192.168.1.5:3000/coins', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ coins: collectedReward })
    //   });
    //   if (!response.ok) {
    //     throw new Error('Failed to add coins to the server');
    //   }
    //   const responseJson = await response.json();
    //   console.log('Coins added to the server:', responseJson);
    // } catch (error) {
    //   console.error('Failed to add coins to the server:', error);
    // }

    store.dispatch({ type: 'ADD_COINS', amount: collectedReward });
  };

  useEffect(() => {
    // create a sequence of up and down animations for each coin
    const animations = coinsPositions.map((_, index) => {
      // create animation for up movement
      const animation1 = Animated.timing(animatedValues[index], {
        toValue: -20,
        duration: coinAnimationDuration / 2,
        useNativeDriver: false,
      });
      // create animation for down movement after some delay
      const animation2 = Animated.timing(animatedValues[index], {
        toValue: 0,
        duration: coinAnimationDuration / 2,
        useNativeDriver: false,
        delay: coinAnimationDelay,
      });
      // return a sequence of animations
      return Animated.sequence([animation1, animation2]);
    });
    // start the animations in a loop
    Animated.loop(Animated.stagger(coinAnimationDelay, animations), { iterations: -1 }).start();
  }, [animatedValues, coinsPositions]);

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
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
              if (disappearedCoins.includes(index)) {
                // if the coin has disappeared, don't render it
                return null;
              }
              return (
                <Animated.View
                  key={index}
                  style={[styles.coin, coinPosition, { transform: [{ translateY: animatedValues[index] }] }]}
                >
                  <TouchableOpacity style={styles.bubble} onPress={() => onCoinPress(index)}>
                    <Image
                      source={[coinImage1, coinImage2, coinImage3][coinPosition.imageIndex]}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.rewardButton} onPress={collectReward}>
            <Text style={styles.rewardButtonText}>Claim Coins</Text>
          </TouchableOpacity>
        </View>

        <TodayHealthDataContainer />
        <FooterBar />
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