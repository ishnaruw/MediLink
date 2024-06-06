import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const TrackMedicationScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const fetchDeliveryDateAndMedications = async () => {
      try {
        const userEmail = await SecureStore.getItemAsync('userEmail');
        const deliveryDateKey = `deliveryDate_${userEmail}`;
        const medicationsKey = `medications_${userEmail}`;

        const storedDate = await AsyncStorage.getItem(deliveryDateKey);
        const storedMedications = await AsyncStorage.getItem(medicationsKey);

        console.log("storedDate: " + storedDate);
        console.log("storedMedications: " + storedMedications);

        if (storedDate) {
          setSelectedDate(new Date(storedDate));
        }

        if (storedMedications) {
          setMedications(JSON.parse(storedMedications));
        }
      } catch (error) {
        console.error('Error fetching delivery date or medications:', error);
      }
    };

    fetchDeliveryDateAndMedications();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Medication</Text>
      {selectedDate ? (
        <Text style={styles.text}>Scheduled Delivery Date: {selectedDate.toLocaleDateString()}</Text>
      ) : (
        <Text style={styles.text}>No scheduled delivery date found.</Text>
      )}

      <Text style={styles.subtitle}>Medicines:</Text>
      {medications.length > 0 ? (
        medications.map((medicine) => (
          <View key={medicine.id} style={styles.medicineContainer}>
            <Text style={styles.medicineName}>{medicine.name}</Text>
            <Text style={styles.medicineDetail}>Quantity: {medicine.quantity_per_day}</Text>
            <Text style={styles.medicineDetail}>Info: {medicine.info}</Text>
            <Text style={styles.medicineDetail}>Total Quantity: {medicine.totalQuantity}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.text}>No medicines found.</Text>
      )}

      {/* Dummy tracking info */}
      <Text style={styles.subtitle}>Tracking Info:</Text>
      <Text style={styles.trackingInfo}>Order Placed</Text>
      <Text style={styles.trackingInfo}>Dispatched</Text>
      {/* Add more tracking info as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#555',
  },
  deliveryDate: {
    fontSize: 16,
    marginBottom: 20,
    color: '#777',
  },
  medicineContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  medicineDetail: {
    fontSize: 16,
    color: '#555',
  },
  trackingInfo: {
    fontSize: 16,
    color: '#007bff', // Blue color for tracking info
  },
});

export default TrackMedicationScreen;
