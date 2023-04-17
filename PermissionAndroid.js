import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

const App = () => {
  const [hasPermission, setHasPermission] = useState(false);

  const checkPermission = async () => {
    try {
      const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
      const response = await PermissionsAndroid.check(permission);
      setHasPermission(response);
    } catch (error) {
      console.warn(error);
    }
  };

  const requestPermission = async () => {
    try {
      const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
      const rationale = {
        title: 'Location Permission',
        message: 'The app needs access to your location',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      };
      const response = await PermissionsAndroid.request(permission, rationale);
      setHasPermission(response === PermissionsAndroid.RESULTS.GRANTED);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <SafeAreaView>
      <View>
        {hasPermission ? (
          <Text>Location access has been granted</Text>
        ) : (
          <View>
            <TouchableOpacity onPress={checkPermission}>
              <Text>Check Permission</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={requestPermission}>
              <Text>Request Permission</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;