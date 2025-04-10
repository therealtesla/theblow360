import { SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Simulate a delay before navigating to DeliveryScreen
    const timer = setTimeout(() => {
      navigation.navigate('FoodDelivery'); 
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.Image
        source={require('../assets/Restaurant.png')} // Replace with your image path
        animation="bounce"
        iterationCount="infinite"
        style={styles.image}
      />
      <ActivityIndicator size="large" color="blue" />
      <Animatable.Text 
        animation="pulse" 
        easing="ease-out" 
        iterationCount="infinite" 
        style={styles.text}
      >
        Preparing your order...
      </Animatable.Text>
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
});