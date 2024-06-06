import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import { FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendSMS } from './smsService'; // Adjust the import path as necessary

const ScheduleDeliveriesScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [medications, setMedications] = useState([]);
  const [errorMessage, setErrorMessage] = useState("You cannot select a date in the past. Please select a new date.");

  useEffect(() => {
    // Fetch medications data from server based on user's email address
    const fetchMedications = async () => {
      try {
        const userEmail = await SecureStore.getItemAsync('userEmail');
        console.log("userEmail: " + userEmail);
        const response = await fetch(`http://192.168.86.34:3100/get-medications/${userEmail}`);
        const data = await response.json();
        if (response.ok) {
          setMedications(data.medications);
        } else {
          setErrorMessage("No medicines ready for delivery");
        }
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    fetchMedications();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.medicineCard}>
      <Text style={styles.medicineName}>{item.name}</Text>
      <Text>Quantity: {item.quantity_per_day}</Text>
      <Text>Info: {item.info}</Text>
      <Text>Total Quantity: {item.totalQuantity}</Text>
    </View>
  );

  const handleScheduleDelivery = async () => {
    const currentDate = new Date();
    if (!selectedDate || selectedDate < currentDate) {
      setShowErrorModal(true);
      return;
    }

    try {
      const userEmail = await SecureStore.getItemAsync('userEmail');
      const scheduledMedicationsKey = `scheduledMedications_${userEmail}`;
      const medicationsKey = `medications_${userEmail}`;

      // Get currently scheduled medications
      const scheduledMedicationsData = await AsyncStorage.getItem(scheduledMedicationsKey);
      let scheduledMedications = scheduledMedicationsData ? JSON.parse(scheduledMedicationsData) : [];

      // Add current medications to the scheduled medications
      scheduledMedications = [...scheduledMedications, ...medications];

      // Store updated scheduled medications
      await AsyncStorage.setItem(scheduledMedicationsKey, JSON.stringify(scheduledMedications));

      // Update the medications to mark them as scheduled
      const updatedMedications = medications.map(med => ({ ...med, scheduled: true }));
      await AsyncStorage.setItem(medicationsKey, JSON.stringify(updatedMedications));

      // Clear local state
      setMedications(updatedMedications);

      // Make a DELETE request to remove medications from the server
      await fetch(`http://192.168.86.34:3100/delete-medications/${userEmail}`, {
        method: 'DELETE'
      });

      // Send SMS notification
      await sendSMS('+1 425 648 9936', 'Your medication delivery has been scheduled successfully!');

      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error scheduling delivery:', error);
    }
  };

  const handleTrackDetails = () => {
    setShowSuccessModal(false);
    navigation.navigate('TrackMedication');
  };

  const handleUploadPrescription = () => {
    navigation.navigate('UploadPrescription');
  };

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TouchableOpacity onPress={handleUploadPrescription}>
            <Text style={styles.uploadPrescriptionLink}>Upload Prescription</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.title}>Medicines Ready for Delivery:</Text>
          <View style={styles.medicinesContainer}>
            <FlatList
              data={medications}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>

          <View style={styles.datePickerContainer}>
            <Text style={styles.title}>Select Delivery Date:</Text>
            <DatePicker
              style={styles.datePicker}
              value={selectedDate}
              mode="date"
              display="default"
              onChange={(event, date) => setSelectedDate(date)}
            />
          </View>

          <Button title="Schedule Delivery" onPress={handleScheduleDelivery} />
        </>
      )}

      {/* Error message modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showErrorModal}
        onRequestClose={() => setShowErrorModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <Button title="OK" onPress={() => setShowErrorModal(false)} />
          </View>
        </View>
      </Modal>

      {/* Success message modal */}
      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Order scheduled successfully!</Text>
            <Button title="Track Details" onPress={handleTrackDetails} />
          </View>
        </View>
      </Modal>
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
  errorMessageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  errorMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  uploadPrescriptionLink: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  medicinesContainer: {
    marginBottom: 20,
    width: '80%',
  },
  medicineCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 2,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  datePickerContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
    justifyContent: 'center',
    elevation: 5,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ScheduleDeliveriesScreen;
