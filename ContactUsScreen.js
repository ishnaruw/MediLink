import React from 'react';
import { View, Text, StyleSheet, Button, Linking } from 'react-native';

const ContactUsScreen = () => {
  const phoneNumber = '+14255984994';

  const handlePressMessageUs = () => {
    const url = `sms:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log('Unable to handle the URL');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.text}>For any inquiries, feel free to reach out to us.</Text>
      <Button title="Message Us" onPress={handlePressMessageUs} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ContactUsScreen;
