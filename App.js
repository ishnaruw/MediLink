import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import UploadPrescriptionScreen from './UploadPrescriptionScreen';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [medicationStatus, setMedicationStatus] = useState('low'); // 'normal', 'low', 'empty'
  const [showWarning, setShowWarning] = useState(true);
  const handleRefillPrescriptions = () => {
    navigation.navigate('UploadPrescription');
  };

  const handleScheduleDeliveries = () => {
    console.log("Navigate to delivery scheduling screen");
  };
  
  const handleTrackMedication = () => {
    console.log("Navigate to medication tracking screen");
  };

  const handleDismissWarning = () => {
    setShowWarning(false);    
  };
  
    const handleWelcomeMessageClick = () => {
      console.log("Welcome message clicked! Provide additional information or navigate to another screen.");
    };
  
    const renderWarningMessage = () => {
      if (showWarning && medicationStatus === 'low') {
        return (
          <View style={styles.warningContainer}>
            <Text style={styles.warningText}>Warning! Your medication is running low. Please reorder now.</Text>
            <TouchableOpacity style={styles.dismissButton} onPress={handleDismissWarning}>
              <Text style={styles.dismissButtonText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return null;
      }
    };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleWelcomeMessageClick}>
        <Text style={styles.title}>Welcome to Your Medication App</Text>
      </TouchableOpacity>
      {renderWarningMessage()}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRefillPrescriptions}>
          <Text style={styles.buttonText}>Refill Prescriptions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleScheduleDeliveries}>
          <Text style={styles.buttonText}>Schedule Deliveries</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleTrackMedication}>
          <Text style={styles.buttonText}>Track Medication</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UploadPrescription" component={UploadPrescriptionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    width: '80%',
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  warningContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  warningText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  dismissButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  dismissButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
