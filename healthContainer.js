import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import { Accelerometer } from 'expo-sensors';
import { useNavigation } from '@react-navigation/native';

const TodayHealthDataContainer = () => {
  const navigation = useNavigation();
  const [distanceWalked, setDistanceWalked] = React.useState(0); // distance walked in km
  const [timeToWalk, setTimeToWalk] = React.useState(0); // time to walk in minutes
  const [caloriesBurned, setCaloriesBurned] = React.useState(0); // calories burned
  const [steps, setSteps] = React.useState(0); // step count

  React.useEffect(() => {
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      
      // Assuming a step occurs when acceleration exceeds a threshold
      const accelerationThreshold = 0.0005;
      if (acceleration >= accelerationThreshold) {
        setSteps(prevSteps => prevSteps + 1);
        setDistanceWalked(prevDistance => prevDistance + 0.5 / 1000); // assuming 0.5 meters per step
        setTimeToWalk(prevTime => prevTime + 0.5 / 80); // assuming 80 steps per minute
        setCaloriesBurned(prevCalories => prevCalories + 0.05); // assuming 0.05 calories burned per step
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Icon name="stats-chart-outline" size={15} color="lightgreen" />
        <Text style={styles.title}>Today's Health data</Text>
      </View>

      <View style={styles.dataContainer}>
        <View style={[styles.dataRow, { justifyContent: 'space-between', flexDirection: 'column' }]}>
          <Text style={styles.dataText}>
            {distanceWalked.toFixed(2)} km
          </Text>
          <FoundationIcon name="foot" size={20} color="green"/>
          <Text style={{ marginLeft: 5 }}>
            Distance
          </Text>
        </View>
        <View style={[styles.dataRow, { justifyContent: 'space-between', flexDirection: 'column' }]}>
          <Text style={styles.dataText}>{timeToWalk.toFixed()} min</Text>
          <Icon name="time-outline" size={20} color="green" />
          <Text style={{ marginLeft: 5 }}>
            Time
          </Text>
        </View>
        <View style={[styles.dataRow, { justifyContent: 'space-between', flexDirection: 'column' }]}>
          <Text style={styles.dataText}>{caloriesBurned.toFixed()} cal</Text>
          <Icon name="flame-outline" size={20} color="green"/>
          <Text style={{ marginLeft: 5 }}>
            Calories
          </Text>
        </View>
      </View>

      <View style={styles.moreContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('StepsRecord')}>
          <Text style={styles.moreText}>More</Text>
          <Icon name='caret-forward' size={12} color='#000000' />
        </TouchableOpacity> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    height: 120,
    marginHorizontal: 20,
    marginBottom: 190,
    marginTop: 70,
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
    marginLeft: 18,
    marginTop: 28,
  },
  dataText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  moreContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginLeft: 8,
    marginTop: 10,
    marginRight: 20,
  },
  moreText: {
    color: '#32cd32',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default TodayHealthDataContainer;