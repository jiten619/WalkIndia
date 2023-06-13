import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import Icon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import { Pedometer } from 'expo-sensors';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const StepRecordPage = ({ recordName }) => {
  const [stepCount, updateStepCount] = useState(0);
  const [distanceWalked, setDistanceWalked] = React.useState(0); // distance walked in km
  const [timeToWalk, setTimeToWalk] = React.useState(0); // time to walk in minutes
  const [caloriesBurned, setCaloriesBurned] = React.useState(0); // calories burned
  const [steps, setSteps] = React.useState(0); // step count
  const [stepData, setStepData] = React.useState([0, 0, 0, 0, 0, 0, 0]); // step data for the past week

  useEffect(() => {
    fetchStepData(); // fetch step data once when the component mounts
    const subscription = Pedometer.watchStepCount((result) => {
      updateStepCount(result.steps);
      setSteps(result.steps); // update the step count state
      setDistanceWalked(result.steps * 0.000762); // calculate distance based on the average stride length of 0.762 meters
      setTimeToWalk(result.steps * 0.6);
      setCaloriesBurned(result.steps * 0.05);
    });
    return () => {
      subscription && subscription.remove(); // remove the subscription when the component unmounts
    };
  }, []);

  const fetchStepData = async () => {
    const today = new Date();
    let stepCounts = [];
    let formattedDate;

    // make an array of promises for each day's API request
    const promises = [...Array(7)].map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      formattedDate = date.toISOString().split('T')[0];
      return fetch(`http://192.168.1.3:3000/steps?date=${formattedDate}`);
    });

    // resolve all promises simultaneously
    const responses = await Promise.all(promises);
    const jsonResponses = await Promise.all(responses.map(res => res.json()));

    // extract the step data for each day
    const stepCountsByDay = jsonResponses.map(res => res[formattedDate]?.steps || 0);
    setStepData(stepCountsByDay);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.recordNameTitle}>Step Record</Text>
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
      </View>
      <LineChart
        data={{ labels: ['Day 6', 'Day 5', 'Day 4', 'Day 3', 'Day 2', 'Day 1', 'Today'], datasets: [{ data: stepData }] }}
        width={screenWidth - 32} // from react-native
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#2F8D8F",
          backgroundGradientFrom: "#2F8D8F",
          backgroundGradientTo: "#2F8D8F",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#FDC702"
          }
        }}
        bezier
        style={styles.chart}
      />
      <View style={styles.healthContainer}>
        <View style={styles.dataContainer}>
          <View style={[styles.dataRow, { justifyContent: 'space-between', flexDirection: 'column' }]}>
            <Text style={styles.dataText}>
              {distanceWalked.toFixed(2)} km
            </Text>
            <FoundationIcon name="foot" size={20} color={'green'} />
            <Text style={{ marginLeft: 5, }}>
              Distance
            </Text>
          </View>

          <View style={[styles.dataRow, { justifyContent: 'space-between', flexDirection: 'column' }]}>
            <Text style={styles.dataText}>{timeToWalk.toFixed()} min</Text>
            <Icon name="time-outline" size={20} color={'green'} />
            <Text style={{ marginLeft: 5, }}>
              Time
            </Text>
          </View>
          <View style={[styles.dataRow, { justifyContent: 'space-between', flexDirection: 'column' }]}>
            <Text style={styles.dataText}>{caloriesBurned.toFixed()} cal</Text>
            <Icon name="flame-outline" size={20} color={'green'} />
            <Text style={{ marginLeft: 5, }}>
              Calories
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F8D8F',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 16,
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
  progressContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordNameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5C4272',
    marginBottom: 16,
  },
  chartContainer: {
    alignSelf: 'stretch',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  healthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: screenWidth - 32,
    borderRadius: 16,
    paddingTop: 8,
    paddingBottom: 16,
    marginTop: 16,
  },
  healthItem: {
    alignItems: 'center',
  },
  healthLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#5C77FF',
  },
  healthValue: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  bottomContainer: {
    alignItems: 'center',
  },
  circularProgressContainer: {
    marginTop: 32,
  },
  circularProgressContent: {
    alignItems: 'center',
  },
  circularProgressLabel: {
    fontSize: 16,
    color: '#5C77FF',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  circularProgressValue: {
    fontSize: 24,
    color: '#5C77FF',
    fontWeight: 'bold',
  },
});

export default StepRecordPage;