import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import UploadPrescriptionScreen from './UploadPrescriptionScreen';
import ScheduleDeliveriesScreen from './ScheduleDeliveriesScreen';
import TrackMedicationScreen from './TrackMedicationScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import 'react-native-gesture-handler'; 
import * as SecureStore from 'expo-secure-store';
import { AuthProvider } from './AuthContext';
import { useAuth } from './AuthContext';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [medicationStatus, setMedicationStatus] = useState('low'); // 'normal', 'low', 'empty'
  const [showWarning, setShowWarning] = useState(true);
  const handleRefillPrescriptions = () => {
    navigation.navigate('UploadPrescription');
  };

  const sendSMS = async () => {
    try {
      const response = await fetch('http://192.168.86.34:3000/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },  
        body: JSON.stringify({
          to: '+1 425 648 9936',
          message: 'Hello from Medilink!',
        }),
      });
      const data = await response.json();
      if (data.success) {
        console.log('SMS sent successfully:', data.messageSid);
      } else {
        console.log('Failed to send SMS:', data.error);
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const handleLogout = async () => {
    try {
      // Clear the session
      setIsLoggedIn(false);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error.message);
      Alert.alert('Error', 'Logout failed. Please try again later');
    }
  };
  

  const handleScheduleDeliveries = () => {
    navigation.navigate('ScheduleDeliveries');
  };
  
  const handleTrackMedication = () => {
    navigation.navigate('TrackMedication');
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
        <Text style={styles.title}>Welcome to Your MediLink</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Button title="Send SMS" onPress={sendSMS} />
      </View>
    </View>
  );
};

const App = () => {
  
  return (
    <NavigationContainer>
      <AuthProvider>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UploadPrescription" component={UploadPrescriptionScreen} />
        <Stack.Screen name="ScheduleDeliveries" component={ScheduleDeliveriesScreen} />
        <Stack.Screen name="TrackMedication" component={TrackMedicationScreen} />
      </Stack.Navigator>
      </AuthProvider>
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