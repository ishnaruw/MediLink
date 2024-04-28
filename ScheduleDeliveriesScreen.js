import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Modal } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import { FlatList } from 'react-native';

const ScheduleDeliveriesScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initial date value set to current date
  const [showErrorModal, setShowErrorModal] = useState(false);
  const errorMessage = "You cannot select a date in the past. Please select a new date.";

  // Hardcoded sample data for medicines
  const medicines = [
    { id: 1, name: 'Ibuprofen', quantity: 2, info: 'Take with food' },
    { id: 2, name: 'Paracetamol (Acetaminophen)', quantity: 1, info: 'Before bedtime' },
    { id: 3, name: 'Amoxicillin', quantity: 3, info: 'Twice daily' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.medicineCard}>
      <Text style={styles.medicineName}>{item.name}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Info: {item.info}</Text>
    </View>
  );

  const ErrorMessageModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showErrorModal}
        onRequestClose={() => {
          setShowErrorModal(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.errorText}>{errorMessage}</Text>
            <Button title="OK" onPress={() => setShowErrorModal(false)} />
          </View>
        </View>
      </Modal>
    );
  };

  const handleScheduleDelivery = () => {
    const currentDate = new Date();
    if (!selectedDate || selectedDate < currentDate) {
      setShowErrorModal(true);
      return;
    }
    console.log("selectedDate: " + selectedDate);
    //navigation.navigate('TrackMedication', { selectedDate });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicines Ready for Delivery:</Text>
      <View style={styles.medicinesContainer}>
        <FlatList
          data={medicines}
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
      <ErrorMessageModal />
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  medicinesContainer: {
    marginBottom: 20,
    width: '80%', // Adjust width to your preference
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
