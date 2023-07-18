import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import Constants from 'expo-constants';
import HomeScreen from './HomeScreen';
import TaskScreen from './TaskScreen';
import InviteScreen from './inviteScreen';
import ProfileScreen from './ProfileScreen';
import PrivacyPolicyScreen from './PrivacyPolicyScreen';
import InviteCodeScreen from './InviteCodeScreen';
import FeedBackScreen from './FeedBackScreen';
import WalletPage from './WalletScreen';
import StepRecordPage from './StepRecordPage';

const Stack = createNativeStackNavigator();

const App = () => {
  if (Constants.manifest.releaseChannel === 'default') {
    console.log('Logbox enabled!');
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#fff',
              },
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome', headerShown: false }} />
            <Stack.Screen name="Task" component={TaskScreen} options={{ title: 'Welcome', headerShown: false }} />
            <Stack.Screen name="Invite" component={InviteScreen} options={{ title: 'Welcome', headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Welcome', headerShown: false }} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title: 'Welcome', headerShown: false }} />
            <Stack.Screen name="InviteCode" component={InviteCodeScreen} options={{ title: 'Welcome', headerShown: false }} />
            <Stack.Screen name="FeedBack" component={FeedBackScreen} options={{ title: 'Welcome', headerShown: false }} />
            <Stack.Screen name="WalletPage" component={WalletPage} options={{ title: 'Welcome', headerShown: false }} />
            <Stack.Screen name="StepsRecord" component={StepRecordPage} options={{ title: 'Welcome', headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
        </PersistGate>
    </Provider>
  );
};

export default App;
