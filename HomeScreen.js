import React, { useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity,ImageBackground, SafeAreaView } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { Pedometer } from 'expo-sensors';
import TodayHealthDataContainer from './healthContainer';
import HalfCurveProgressBar from './ProgressBar';
import Navbar from './NavBar';
import FooterBar from './footerbar';
import Coin from './Coin';
import CoinsContainer  from './CoinsContainer';
import StepCounter from './stepCounter'; 

const backgroundImage = { uri: 'https://img.freepik.com/free-vector/city-runner-cartoon-concept-with-group-young-people-running-outdoors-vector-illustration_1284-81128.jpg' };

const HomeScreen = () => {
  const [steps, setSteps] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // Add code to access pedometer data and update steps count
class App extends React.Component {
  state = {
    steps: 0,
  };

  componentDidMount() {
    this.subscription = Pedometer.watchStepCount(result => {
      this.setState({
        steps: result.steps,
      });
    });

    // You can also get the current step count
    Pedometer.getStepCountAsync().then(result => {
      this.setState({
        steps: result.steps,
      });
    });
  }

  componentWillUnmount() {
    this.subscription && this.subscription.remove();
    this.subscription = null;
  }

  render() {
    return (
      <View>
        <Text>Steps taken: {this.state.steps}</Text>
      </View>
    );
  }
}
let subscription = Pedometer.watchStepCount(result => {
  setSteps(result.steps);
  setProgress(result.steps / 10000); //set progress bar to show percentage of goals completed
});


return () => {
  subscription && subscription.remove();
  subscription = null;
};
  }, []);
  


  const collectReward = () => {
    // Here you can add the logic to generate the number of reward coins randomly and add them to the user's wallet 
    const randomCoins = Math.floor(Math.random() * (1000 - 0.1 + 1) + 0.1);
    console.log(`Collected ${randomCoins} coins as a reward!`);
  };

  
  

  return (
    <View  style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage} >
      <Navbar />
      <View style={styles.progressContainer}>
        {/* <CoinsContainer/> */}
         <HalfCurveProgressBar progress={progress} />
        {/* <Text style={styles.stepsText}>{steps} Steps</Text> */}
        <StepCounter/>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <TouchableOpacity
        style={styles.rewardButton}
        onPress={collectReward}>
        <Text style={styles.rewardButtonText}>Claim Coins</Text>
      </TouchableOpacity>
    </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20, 
    marginHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  walletAmount: {
    marginLeft: 5,
    fontSize: 16,
  },
  progressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    width: 200,
  },
  stepsText: {
    marginTop: 10,
    fontSize: 18,
  },
  rewardButton: {
    paddingVertical: 5,
    paddingHorizontal: 50,
    backgroundColor: '#2196f3',
    borderRadius: 15,
    marginTop: 10,
  },
  rewardButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;