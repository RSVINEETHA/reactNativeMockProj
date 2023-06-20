import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image ,ScrollView} from 'react-native';
import * as Google from 'expo-google-app-auth';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCLa4M6LEesDqtOT_KsR7jSVw9vA-h52uI",
  authDomain: "newproject-cbe65.firebaseapp.com",
  projectId: "newproject-cbe65",
  storageBucket: "newproject-cbe65.appspot.com",
  messagingSenderId: "638584742874",
  appId: "1:638584742874:web:66c9f842630823d7c596e3",
  measurementId: "G-9TY0W3GQM0"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  const handleLogin = async () => {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        androidClientId: '638584742874-n5sv721cnlie7btbae1drkphijni6ms9.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (type === 'success') {
        const credential = GoogleAuthProvider.credential(null, accessToken);
        await signInWithCredential(auth, credential);
        console.log('Logged in successfully!', user);
      } else {
        console.log('Google login cancelled.');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Logged out successfully!');
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const Card = ({ imageSource, description }) => (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={imageSource} />
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Arthmate</Text>
      {isLoggedIn ? (
        <>
          <Button title="Logout" onPress={handleLogout} />
          <View>
            <Card
              imageSource={require('./assets/tech.jpg')}
              description="Arthmate is India's premier embedded fintech platform."
            />
            <Card
              imageSource={require('./assets/tech.jpg')}
              description="Arthmate is India's premier embedded fintech platform."
            />
          </View>
        </>
      ) : (
        <>
          <Button title="Login with Google" onPress={handleLogin} />
          <View>
            <Card
              imageSource={require('./assets/tech.jpg')}
              description="Arthmate is India's premier embedded fintech platform. "
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
  },
  cardImage: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 12,
    textAlign: 'center',
  },
});


