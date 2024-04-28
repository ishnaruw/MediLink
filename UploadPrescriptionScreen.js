import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import dummyPrescriptionImage from './assets/dummy_prescription.jpeg'; 

//const dummyPrescriptionImage = require('./dummy-prescription-image.jpg');

const UploadPrescriptionScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUploadPress = () => {
    // Implement logic to upload the selected image
    console.log("Selected image:", selectedImage);
  };

  const handleCancelPress = () => {
    // Implement logic to cancel the upload
    console.log("Upload cancelled");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Prescription Image</Text>
      <Image source={dummyPrescriptionImage} style={styles.image} />
      <View style={styles.buttonsContainer}>
        <Button title="Upload" onPress={handleUploadPress} />
        <Button title="Cancel" onPress={handleCancelPress} />
      </View>
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
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default UploadPrescriptionScreen;
