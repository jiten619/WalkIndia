import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from './NavBar';
import FooterBar  from './footerbar';



const TaskScreen = () => {
  const navigation = useNavigation();
  const [dailyTasks, setDailyTasks] = useState([
    { id: 1, task: 'Wake up', completed: false },
    { id: 2, task: 'Eat breakfast', completed: false },
    { id: 3, task: 'Go to school/work', completed: false },
    { id: 4, task: 'Study', completed: false },
    { id: 5, task: 'Eat fruits', completed: false },
    { id: 6, task: 'Lunch', completed: false },
    { id: 7, task: 'Rest', completed: false },
    { id: 8, task: 'Tea Break', completed: false },
    { id: 9, task: 'Gymming', completed: false },
    { id: 10, task: 'Walking', completed: false },
    { id: 11, task: 'Entertainment', completed: false },
    { id: 12, task: 'Hot Bath', completed: false },
    { id: 13, task: 'Sleep', completed: false },
  ]);

  const [stepTasks, setStepTasks] = useState([
    { id: 1, steps: 100, completed: false },
    { id: 2, steps: 200, completed: false },
    { id: 3, steps: 300, completed: false },
    { id: 4, steps: 400, completed: false },
    { id: 5, steps: 500, completed: false },
    { id: 6, steps: 600, completed: false },
    { id: 7, steps: 700, completed: false },
    { id: 8, steps: 800, completed: false },
    { id: 9, steps: 900, completed: false },
    { id: 10, steps: 1000, completed: false },
    { id: 11, steps: 2000, completed: false },
    { id: 12, steps: 3000, completed: false },
    { id: 13, steps: 4000, completed: false },
    { id: 14, steps: 5000, completed: false },
  ]);

  const handleDailyTaskComplete = (id) => {
    let updatedTasks = [...dailyTasks];
    let taskIndex = updatedTasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      updatedTasks[taskIndex].completed = true;
      setDailyTasks(updatedTasks);
    }
  };

  const handleStepTaskComplete = (id) => {
    let updatedTasks = [...stepTasks];
    let taskIndex = updatedTasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      updatedTasks[taskIndex].completed = true;
      setStepTasks(updatedTasks);
    }
  };

  return (
    
    <View style={styles.container}>
      
        <Navbar />

      <ScrollView style={styles.scrollView}>
      
        {/* Invite Friends Section */}
        <TouchableOpacity
          style={styles.inviteContainer}
          onPress={() =>  navigation.navigate('Invite')}>
          <Text style={styles.inviteText}>Invite Friend To Earn More</Text>
          {/* Add animations here */}
        </TouchableOpacity>

        {/* Daily Life Tasks*/}
        <Text style={styles.taskHeading}>Healthy Habit Tasks</Text>
        
        <View style={styles.taskContainer1}>
          {dailyTasks.map((task) => (
            <View style={styles.taskCard} key={task.id}>
              <Text style={styles.task}>{task.task}</Text>
              {!task.completed ? (
                <TouchableOpacity
                  style={styles.rewardButton}
                  onPress={() => handleDailyTaskComplete(task.id)}>
                  <Text style={styles.rewardButtonText}>Receive</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.taskCompleted}>Completed</Text>
              )}
            </View>
          ))}
        </View>

        {/* Step Tasks */}
        <Text style={styles.taskHeading}>Step Tasks</Text>
        <View style={styles.taskContainer2}>
          {stepTasks.map((task) => (
            <View style={styles.taskCard} key={task.id}>
              <Text style={styles.task}>Walk {task.steps} steps</Text>
              {!task.completed ? (
                <TouchableOpacity
                  style={styles.rewardButton}
                  onPress={() => handleStepTaskComplete(task.id)}>
                  <Text style={styles.rewardButtonText}>Receive</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.taskCompleted}>Completed</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      
        <FooterBar/>
        
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#57F28D',
    paddingHorizontal: 20,
  },
  inviteContainer: {
    backgroundColor: '#5750A1',
    borderRadius: 50,
    padding: 20,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskContainer1: {
    marginVertical: 10,
    borderWidth: 2, 
    borderColor: 'black',
    borderRadius: 15,
    padding: 5,
    backgroundColor: '#fff',
  },
  taskContainer2: {
    marginVertical: 10,
    borderWidth: 2, 
    borderColor: 'black',
    borderRadius: 15,
    padding: 5,
    backgroundColor: '#fff',
  },
  taskHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  task: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rewardButton: {
    backgroundColor: 'grey',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
  },
  rewardButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  taskCompleted: {
    fontSize: 16,
    color: '#00cc00',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
    paddingHorizontal: 20,
    borderTopWidth: 2,
    borderTopColor: '#ccc',
  },
});

export default TaskScreen;