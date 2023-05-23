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
  const [stepData, setStepData] = React.useState([300,600,1000,380,540,710,0]); // step data for the past week

  useEffect(()=> {
    subscribe();
  }, [])

  subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      updateStepCount(result.steps)
    })
  }

  React.useEffect(() => {
    // get step data for the past 7 days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDay = new Date();
    endDay.setHours(23, 59, 59, 999);
    endDay.setDate(endDay.getDate()-6);

    Pedometer.getStepCountAsync(today, endDay).then(
      result => {
        let pastStepData = [];
        for (let i = 0; i < result.length; i++){
          pastStepData.push(result[i].steps);
        }
        setStepData(pastStepData.reverse()); // reverse the order of pastStepData
      },
      error => {
        console.log("Error getting step data for the past week: " + error);
      }
    );

    const subscription = Pedometer.watchStepCount(result => {
      if (result && result.steps !== undefined) {
        setSteps(result.steps);
        setDistanceWalked(result.steps * 0.5 / 1000); // assuming 0.5 meters per step
        setTimeToWalk(result.steps * 0.5 / 80); // assuming 80 steps per minute
        setCaloriesBurned(result.steps * 0.05); // assuming 0.05 calories burned per step
      }
    }, today);

    return () => subscription.remove();
  }, []);

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
        data={{ labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], datasets: [{ data: stepData }] }}
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