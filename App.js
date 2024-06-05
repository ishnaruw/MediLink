import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UploadPrescriptionScreen from './UploadPrescriptionScreen';
import ScheduleDeliveriesScreen from './ScheduleDeliveriesScreen';
import TrackMedicationScreen from './TrackMedicationScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import 'react-native-gesture-handler'; 
import { AuthProvider } from './AuthContext';
const Stack = createStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <AuthProvider>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UploadPrescription" component={UploadPrescriptionScreen} />
        <Stack.Screen name="ScheduleDeliveries" component={ScheduleDeliveriesScreen} />
        <Stack.Screen name="TrackMedication" component={TrackMedicationScreen} />
      </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};



export default App;