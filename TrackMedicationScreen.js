import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TrackMedicationScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchSelectedDate = async () => {
      try {
        const dateFromStorage = await AsyncStorage.getItem('selectedDate');
        if (dateFromStorage) {
          setSelectedDate(new Date(JSON.parse(dateFromStorage)));
        }
      } catch (error) {
        console.error('Error fetching selected date from AsyncStorage:', error);
      }
    };

    fetchSelectedDate();
  }, []);

  const medicines = [
    { id: 1, name: 'Ibuprofen', quantity: 2, info: 'Take with food' },
    { id: 2, name: 'Paracetamol (Acetaminophen)', quantity: 1, info: 'Before bedtime' },
    { id: 3, name: 'Amoxicillin', quantity: 3, info: 'Twice daily' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Medication</Text>
      {selectedDate && (
        <>
          <Text style={styles.subtitle}>Delivery Date:</Text>
          <Text style={styles.deliveryDate}>{selectedDate.toDateString()}</Text>
        </>
      )}

      <Text style={styles.subtitle}>Medicines:</Text>
      {medicines.map((medicine) => (
        <View key={medicine.id} style={styles.medicineContainer}>
          <Text style={styles.medicineName}>{medicine.name}</Text>
          <Text style={styles.medicineDetail}>Quantity: {medicine.quantity}</Text>
          <Text style={styles.medicineDetail}>Info: {medicine.info}</Text>
        </View>
      ))}

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
