import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useAuth } from './AuthContext';
import * as SecureStore from 'expo-secure-store';

const dummyPrescriptionImage = require('./assets/dummy_prescription.jpeg');

const UploadPrescriptionScreen = () => {
  const navigation = useNavigation();
  const { email } = useAuth();  // Get the email from the AuthContext
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const uploadImage = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', {
        uri: selectedImage.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
  
      try {
        // Retrieve the user's email address from device storage
        const userEmail = await SecureStore.getItemAsync('userEmail');
        if (!userEmail) {
          throw new Error('User email not found');
        }
  
        const url = 'http://192.168.86.34:4000/upload';
        const params = { email: userEmail };
  
        // Append the email address as a query parameter to the URL
        const fullUrl = `${url}?${new URLSearchParams(params).toString()}`;
  
        const response = await axios.post(fullUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log('Upload success:', response.data);
        setShowSuccessMessage(true);
      } catch (error) {
        console.log('Upload failed:', error);
      }
    }
  };

  useEffect(() => {
    if (showSuccessMessage) {
      const timeout = setTimeout(() => {
        setShowSuccessMessage(false);
        navigation.navigate('Home');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [showSuccessMessage, navigation]);

  const handleOKPress = () => {
    navigation.navigate('Home');
  };

  const handleCancelPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Prescription Image</Text>
      <Modal
        visible={showSuccessMessage}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSuccessMessage(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.successMessage}>
              Prescription uploaded successfully! Our team will look into the prescription and confirm the order.
            </Text>
            <Button title="OK" onPress={handleOKPress} />
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <Button title="Pick an image from gallery" onPress={pickImage} />
        {selectedImage && <Image source={{ uri: selectedImage.uri }} style={styles.image} />}
        {selectedImage && <Button title="Upload Image" onPress={uploadImage} />}
      </View>
      {!showSuccessMessage && (
        <View style={styles.buttonsContainer}>
          <Button title="Cancel" onPress={handleCancelPress} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default UploadPrescriptionScreen;
