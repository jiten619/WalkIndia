import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import CircularProgress from 'react-native-circular-progress-indicator';
import Icon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import { Pedometer } from 'expo-sensors';

const screenWidth = Dimensions.get('window').width;



const stepRecords = [
  { date: '2022-11-01', steps: 5000, distance: 2.5, time: '20:30', calories: 200 },
  { date: '2022-11-02', steps: 6000, distance: 3.0, time: '25:10', calories: 250 },
  { date: '2022-11-03', steps: 7500, distance: 3.75, time: '29:45', calories: 300 },
  { date: '2022-11-04', steps: 8000, distance: 4.0, time: '32:20', calories: 320 },
  { date: '2022-11-05', steps: 6000, distance: 3.0, time: '25:30', calories: 250 },
  { date: '2022-11-06', steps: 8500, distance: 4.25, time: '35:45', calories: 340 },
  { date: '2022-11-07', steps: 9000, distance: 4.5, time: '40:20', calories: 360 },
];

const StepRecordPage = ({ recordName }) => {
  const [stepCount, updateStepCount] = useState(0);
  const [selectedData, setSelectedData] = useState('week');
  const [distanceWalked, setDistanceWalked] = React.useState(0); // distance walked in km
  const [timeToWalk, setTimeToWalk] = React.useState(0); // time to walk in minutes
  const [caloriesBurned, setCaloriesBurned] = React.useState(0); // calories burned
  const [steps, setSteps] = React.useState(0); // step count

  useEffect(()=> {
    subscribe();
  }, [])

  subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      updateStepCount(result.steps)
    })
  }

  React.useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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


  const getChartData = () => {
    let dataPoints = [];
    let labels = [];
    let distance = 0;
    let time = 0;
    let burnedCalories = 0;
    let maxValue = 0;

    switch (selectedData) {
      case 'day':
        dataPoints = stepRecords.slice(-7);
        dataPoints.forEach((item) => {
          labels.push(item.date.split('-')[2]);
          if (item.steps > maxValue) {
            maxValue = item.steps;
          }
          distance += item.distance;
          time +=
            parseInt(item.time.split(':')[0]) * 60 +
            parseInt(item.time.split(':')[1]);
          burnedCalories += item.calories;
        });
        break;
      case 'week':
        dataPoints = stepRecords.slice(-7);
        dataPoints.forEach((item) => {
          labels.push(item.date.split('-')[2]);
          if (item.steps > maxValue) {
            maxValue = item.steps;
          }
          distance += item.distance;
          time +=
            parseInt(item.time.split(':')[0]) * 60 +
            parseInt(item.time.split(':')[1]);
          burnedCalories += item.calories;
        });
        break;
      case 'month':
        dataPoints = stepRecords.slice(-30);
        dataPoints.forEach((item) => {
          labels.push(item.date.split('-')[2]);
          if (item.steps > maxValue) {
            maxValue = item.steps;
          }
          distance += item.distance;
          time +=
            parseInt(item.time.split(':')[0]) * 60 +
            parseInt(item.time.split(':')[1]);
          burnedCalories += item.calories;
        });
        break;
    }

    return {
      labels,
      datasets: [
        {
          data: dataPoints.map((item) => item.steps),
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: ['Steps'],
      maxValue,
      decimalPlaces: 1,
      distance,
      time,
      burnedCalories,
    };
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
        
      <View style={styles.chartContainer}>
        <LineChart
          data={getChartData()}
          width={screenWidth - 32}
          height={220}
          withInnerLines={false}
          chartConfig={{
            backgroundColor: '#FFF',
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            decimalPlaces: '1',
            color: (opacity = 1) => `rgba(92, 119, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(92, 119, 255, ${opacity})`,
            style: {
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#F5F5F5',
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#F5F5F5',
            },
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