import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {ImagePicker }from 'react-native-image-picker'; // Imported for image selection

const FeedbackScreen = () => {
  const [problem, setProblem] = useState('');
  const [data, setData] = useState('');
  const [image, setImage] = useState(null);

  // Function to handle image selection
  const handleChooseImage = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // Open Image Picker library to choose image
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        setImage(response);
      }
    });
  }

  // Function to handle submit button press
  const handleSubmit = () => {
    // Call API to submit feedback with problem, data, and image
    const formData = new FormData();

  // Append problem and data to form data
  formData.append('problem', problem);
  formData.append('data', data);

  // If image is selected, append it to form data
  if (image) {
    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });
  }

  // Call API to submit feedback with problem, data, and image
  fetch('https://your-api.com/submit-feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  })
    .then((response) => {
      // Handle API response
      console.log(response);
    })
    .catch((error) => {
      // Handle error
      console.error(error);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>1. Describe Your Problem:</Text>
        <TextInput
          style={styles.input}
          placeholder="Please write your problem here..."
          value={problem}
          onChangeText={setProblem}
          multiline
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>2. Attach Your Data:</Text>
        <TextInput
          style={styles.input}
          placeholder="Please attach your data here..."
          value={data}
          onChangeText={setData}
          multiline
        />
      </View>
      <Text style={styles.label}>3. Please describe your problem with a picture (choice):</Text>
      <View style={styles.imageContainer}>
      
        <TouchableOpacity style={styles.imageButton} onPress={handleChooseImage}>
          {image ? (
            <Text style={styles.imageText}>Image Attached</Text>
          ) : (
            <Text style={styles.imageText}>Choose Image</Text>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    height: 100,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 16,
    color: '#888',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FeedbackScreen;