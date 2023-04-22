import React , { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, StyleSheet, View} from 'react-native';
import { Pedometer } from 'expo-sensors';


function StepCounter() {
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


  return(
    
    <View>
      <StatusBar style='auto'/>
      <Text style={styles.stepDesign}>{stepCount}</Text>
    </View>
    
  ); 
}

const styles = StyleSheet.create({
  stepDesign: {
    fontSize: 20,
    fontWeight: 'bold',
  }
})

export default StepCounter;