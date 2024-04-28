import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const dummyPrescriptionImage = require('./assets/dummy_prescription.jpeg');

const UploadPrescriptionScreen = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (showSuccessMessage) {
      // Automatically navigate to the home page after 3 seconds
      const timeout = setTimeout(() => {
        navigation.navigate('Home');
      }, 3000);

      // Clean up the timeout to avoid memory leaks
      return () => clearTimeout(timeout);
    }
  }, [showSuccessMessage, navigation]);

  const handleUploadPress = () => {
    // Mocking an upload process with a delay
    setTimeout(() => {
      // Set state to show the success message
      setShowSuccessMessage(true);
    }, 1000);
  };

  const handleCancelPress = () => {
    // Implement logic to cancel the upload
    console.log("Upload cancelled");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Prescription Image</Text>
      <Image source={dummyPrescriptionImage} style={styles.image} />
      {/* {showSuccessMessage && (
        <Text style={styles.successMessage}>
          Prescription uploaded successfully! Our team will look into the prescription and confirm the order.
        </Text>
      )} */}
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
          </View>
        </View>
      </Modal>
      {!showSuccessMessage && (
        <View style={styles.buttonsContainer}>
          <Button title="Upload" onPress={handleUploadPress} />
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
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  successMessage: {
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
    marginTop: 20,
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
  },
});

export default UploadPrescriptionScreen;
