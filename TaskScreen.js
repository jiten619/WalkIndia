import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Navbar from './NavBar';
import FooterBar from './footerbar';
import store from './store';

const TaskScreen = () => {
  const navigation = useNavigation();
  const [dailyTasks, setDailyTasks] = useState([
    { id: 1, task: 'Wake up', time: '06:00 AM', completed: false },
    { id: 2, task: 'Eat breakfast', time: '07:00 AM', completed: false },
    { id: 3, task: 'Go to school/work', time: '09:00 AM', completed: false },
    { id: 4, task: 'Study', time: '11:00 AM', completed: false },
    { id: 5, task: 'Eat fruits', time: '12:00 PM', completed: false },
    { id: 6, task: 'Lunch', time: '02:00 PM', completed: false },
    { id: 7, task: 'Rest', time: '03:00 PM', completed: false },
    { id: 8, task: 'Tea Break', time: '05:00 PM', completed: false },
    { id: 9, task: 'Gymming', time: '06:00 PM', completed: false },
    { id: 10, task: 'Walking', time: '07:00 PM', completed: false },
    { id: 11, task: 'Entertainment', time: '08:00 PM', completed: false },
    { id: 12, task: 'Hot Bath', time: '09:00 PM', completed: false },
    { id: 13, task: 'Sleep', time: '11:00 PM', completed: false },
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
    const updatedTasks = dailyTasks.map((task) => {
      if (task.id === id) {
        const newTask = { ...task, completed: true };
        const earnedCoins = Math.floor(Math.random() * 5000);
        store.dispatch({ type: 'ADD_COINS', amount: earnedCoins });
        return newTask;
      }
      return task;
    });
    setDailyTasks(updatedTasks);
  };

  const handleStepTaskComplete = (id) => {
    const updatedTasks = stepTasks.map((task) => {
      if (task.id === id) {
        const newTask = { ...task, completed: true };
        const earnedCoins = Math.floor(Math.random() * 5000);
        store.dispatch({ type: 'ADD_COINS', amount: earnedCoins });
        return newTask;
      }
      return task;
    });
    setStepTasks(updatedTasks);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkTaskTimes();
      checkStepCounts();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const checkTaskTimes = () => {
    const updatedTasks = dailyTasks.map((task) => {
      const currentDateTime = moment();
      const taskTime = moment(`${moment().format('YYYY-MM-DD')} ${task.time}`, 'YYYY-MM-DD hh:mm A');
      if (taskTime.isBefore(currentDateTime) && !task.completed) {
        return { ...task, expired: true };
      }
      return { ...task, expired: false };
    });
    setDailyTasks(updatedTasks);
  };

  const checkStepCounts = () => {
    const stepCount = store.getState().stepCount || 0;
    const updatedTasks = stepTasks.map((task) => {
      if (!task.completed && task.steps <= stepCount) {
        return { ...task, expired: true };
      }
      return { ...task, expired: false };
    });
    setStepTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView style={styles.scrollView}>
        {/* Invite Friends Section */}
        <TouchableOpacity
          style={styles.inviteContainer}
          onPress={() => navigation.navigate('Invite')}>
          <Text style={styles.inviteText}>Invite Friend To Earn More</Text>
          {/* Add animations here */}
        </TouchableOpacity>

        {/* Daily Life Tasks*/}
        <Text style={styles.taskHeading}>Healthy Habit Tasks</Text>

        <View style={styles.taskContainer1}>
          {dailyTasks.map((task) => (
            <View
              style={{
                ...styles.taskCard,
                backgroundColor: task.expired ? '#fff' : '#fff',
              }}
              key={task.id}>
              <View>
                <Text style={styles.task}>{task.task}</Text>
                <Text style={styles.taskTime}>{task.time}</Text>
              </View>
              {!task.completed ? (
                <TouchableOpacity
                  style={[
                    styles.rewardButton,
                    task.expired
                      ? { backgroundColor: '#ff8c00', borderColor: 'black' }
                      : { backgroundColor: 'grey', borderColor: 'grey' },
                  ]}
                  onPress={() => handleDailyTaskComplete(task.id)}>
                  <View style={styles.rewardButtonView}>
                    <MaterialIcons name="video-library" size={14} color="white" style={styles.rewardButtonIcon} />
                    <Text
                      style={[
                        styles.rewardButtonText,
                        task.completed || task.expired
                          ? { backgroundColor: '#ff8c00' }
                          : { backgroundColor: 'grey' },
                      ]}>
                      Receive
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.taskCompletedButton}>
                  <Text style={styles.taskCompleted}>Done</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

       {/* Step Tasks */}
       <Text style={styles.taskHeading}>Step Tasks</Text>
        <View style={styles.taskContainer2}>
          {stepTasks.map((task) => (
            <View
              style={{
                ...styles.taskCard,
                backgroundColor: task.expired ? '#fff' : '#fff',
              }}
              key={task.id}>
              <View>
                <Text style={styles.task}>Walk {task.steps} steps</Text>
              </View>
              {!task.completed ? (
                <TouchableOpacity
                  style={[
                    styles.rewardButton,
                    task.expired
                      ? { backgroundColor: '#ff8c00', borderColor: 'black' }
                      : { backgroundColor: 'grey', borderColor: 'grey' },
                  ]}
                  onPress={() => handleStepTaskComplete(task.id)}>
                  <View style={styles.rewardButtonView}>
                    <MaterialIcons name="video-library" size={14} color="white" style={styles.rewardButtonIcon} />
                    <Text
                      style={[
                        styles.rewardButtonText,
                        task.completed || task.expired
                          ? { backgroundColor: '#ff8c00' }
                          : { backgroundColor: 'grey' },
                      ]}>
                      Receive
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.taskCompletedButton}>
                  <Text style={styles.taskCompleted}>Done</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <FooterBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBDFEA',
  },
  scrollView: {
    flex: 1,
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
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskContainer1: {
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 15,
    padding: 5,
    backgroundColor: '#fff',
  },
  taskContainer2: {
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 15,
    padding: 5,
    backgroundColor: '#fff',
  },
  taskHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#567189',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskTime: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 14,
  },
  rewardButton: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 0.5,
    backgroundColor: 'grey',
  },
  rewardButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardButtonIcon: {
    marginRight: 5,
  },
  rewardButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center', // to center the text on the button
    backgroundColor: 'grey',
  },
  taskCompletedButton: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'black',
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