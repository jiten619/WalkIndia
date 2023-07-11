import React, { useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const FeedbackScreen = () => {
  const [problem, setProblem] = useState('');
  const [data, setData] = useState('');
  const [email, setEmail] = useState('');
  const [images, setImages] = useState([]);

  const handleChooseImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });
      if (!result.canceled) {
        setImages([...images, ...result.assets]); // Add selected images to existing array
      }
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1); // Remove image from array
    setImages(newImages); // Set state with updated array
  };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append('problem', problem);
    formData.append('data', data);
    formData.append('email', email);

    images &&
      images.map((image, index) => {
        formData.append('image', {
          uri: image.uri,
          type: 'image/jpeg',
          name: `feedback-${Date.now().toString()}-${index}.jpeg`, // Unique name for each image
        });
      });

    fetch('http://192.168.1.5:3000/submit-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
        <View style={styles.inputContainer}>
          <Text style={styles.label}>3. Your Email Id:</Text>
          <TextInput
            style={styles.inputEmail}
            placeholder="Please enter your email id"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <Text style={styles.label}>3. Attach a picture or multiple pictures:</Text>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={handleChooseImages}>
            <Text style={styles.imageText}>Choose Image(s)</Text>
          </TouchableOpacity>
          {images.length > 0 && (
            <View style={styles.selectedImages}>
              {images.map((image, index) => (
                <View key={index} style={styles.selectedImageContainer}>
                  <Image source={{ uri: image.uri }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveImage(index)}>
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
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
  inputEmail: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    height: 50,
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
  selectedImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  selectedImageContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  imagePreview: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
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