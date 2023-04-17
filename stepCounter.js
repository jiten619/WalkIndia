import React, { useState, useEffect } from 'react';
import { Text, PermissionsAndroid } from 'react-native';
import { GoogleFit } from 'react-native-google-fit';

function StepCounter() {
  const [steps, setSteps] = useState(0);

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission Required',
          message:
            'My App needs access to your location in order to display relevant information.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async function requestSteps() {
    const options = {
      startDate: '2022-01-01T00:00:17.971Z',
      endDate: new Date().toISOString(),
      dataType: 'step_count',
      bucketInterval: 86400000,
    };

    try {
      await GoogleFit.checkIsAuthorized();
      await GoogleFit.requestPermissions(
        {
          scopes: [
            'https://www.googleapis.com/auth/fitness.activity.read',
            'https://www.googleapis.com/auth/fitness.body.read',
          ],
        },
        'Authorize GoogleFit',
      );

      const samples = await GoogleFit.getDailyStepCountSamples(
        options.startDate,
        options.endDate,
        { limit: 1 },
      );
      console.log('Daily step count', samples);
      setSteps(samples[0].value);
    } catch (err) {
      console.warn(err);
      setSteps('Error getting steps');
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function startMonitoring() {
      try {
        await requestLocationPermission();
        await requestSteps();
      } catch (err) {
        console.warn(err);
      }
    }

    startMonitoring();

    return () => {
      isMounted = false;
    };
  }, []);

  return <Text>{steps}</Text>;
}

export default StepCounter;