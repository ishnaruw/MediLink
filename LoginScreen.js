import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import bcrypt from 'react-native-bcrypt';
import { useAuth } from './AuthContext';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { CommonActions } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const { setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Clear the email and password fields when the screen gains focus
      setEmail('');
      setPassword('');
    }, [])
  );

  const checkLogin = async () => {
    const userEmail = await SecureStore.getItemAsync('userEmail');
    const userPassword = await SecureStore.getItemAsync('userPassword');
    if (userEmail && userPassword) {
      setIsLoggedIn(true);
      navigation.navigate('Home');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    try {
      //const isAuthenticated = false;
      const storedEmail = await SecureStore.getItemAsync('userEmail');
      const storedPassword = await SecureStore.getItemAsync('userPassword');

      if (!storedEmail || !storedPassword) {
        throw new Error('No email or password stored');
      }
      
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      const isEmailMatch = trimmedEmail === storedEmail;
      const isPasswordMatch = bcrypt.compareSync(trimmedPassword, storedPassword);

      if (isEmailMatch && isPasswordMatch) {
        setIsLoggedIn(true);
        //isAuthenticated = true;
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
        Alert.alert('Success', 'Login successful');
        navigation.navigate('Home');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      Alert.alert('Error', 'Login failed. Please try again later');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Welcome back to MediLink</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
          <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#3498db',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    color: '#7f8c8d',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  icon: {
    padding: 5,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  linkText: {
    color: '#3498db',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default LoginScreen;
