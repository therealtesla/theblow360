import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin, setOrigin } from '../slices/navSlice';
import { XCircleIcon } from 'react-native-heroicons/outline';
import bike from '../assets/bike.png';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const FoodDeliveryScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const restaurant = useSelector(selectRestaurant);
  const userLocation = useSelector(selectOrigin);
  const [estimatedTime, setEstimatedTime] = useState('45-55 Minutes'); // Default value
  const [currentDateTime, setCurrentDateTime] = useState('');

  // Fetch user location on component mount
  useEffect(() => {
    const fetchUserLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      dispatch(setOrigin({
        location: {
          lat: location.coords.latitude,
          long: location.coords.longitude,
        },
      }));
    };

    fetchUserLocation();
  }, []);

  // Calculate distance and time using Google Maps Distance Matrix API
  useEffect(() => {
    const fetchDistanceAndTime = async () => {
      if (!restaurant || !userLocation?.location) return;

      const API_KEY = 'AIzaSyARsz7FWMaL0miP9EahKAp07HK5xaIkyB4'; // Replace with your API key
      const origin = `${userLocation.location.lat},${userLocation.location.long}`;
      const destination = `${restaurant.lat},${restaurant.long}`;

      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${API_KEY}`
        );

        const data = response.data;
        if (data.rows[0].elements[0].status === 'OK') {
          const duration = data.rows[0].elements[0].duration.text; // e.g., "15 mins"
          setEstimatedTime(duration);
        } else {
          console.log('Error fetching distance matrix:', data.rows[0].elements[0].status);
        }
      } catch (error) {
        console.error('Error fetching distance matrix:', error);
      }
    };

    fetchDistanceAndTime();
  }, [restaurant, userLocation]);

  // Function to calculate total time (estimatedTime + 50 mins)
  const calculateTotalTime = () => {
    const timeInMinutes = parseInt(estimatedTime.split(' ')[0]); // Extract the number from "15 mins"
    if (!isNaN(timeInMinutes)) {
      return `${timeInMinutes + 50} mins`; // Add 50 and format it back
    }
    return estimatedTime; // Fallback if parsing fails
  };

  // Update current date and time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString(); // Format as "MM/DD/YYYY, HH:MM:SS AM/PM"
      setCurrentDateTime(formattedDateTime);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); // Update every second
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <View style={tw`bg-white flex-1`}>
      <SafeAreaView style={tw`z-50`}>
        <View style={tw`flex-row justify-between items-center p-5`}>
          <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <XCircleIcon color="blue" height={30} width={30} />
          </TouchableOpacity>
          <Text style={tw`font-light text-lg`}>Order Help</Text>
        </View>

        <View style={tw`bg-blue-100 p-6 rounded-md mx-5 my-2 z-50 shadow-md`}>
          <View style={tw`flex-row justify-between`}>
            <View>
              <Text style={tw`text-lg text-gray-400`}>Estimated Arrival</Text>
              <Text style={tw`text-2xl font-bold mr-4`}>{calculateTotalTime()}</Text>
              {/* Dynamic Date and Time */}
              <Text style={tw`text-sm text-gray-500 mt-2`}>{currentDateTime}</Text>
            </View>
            <Image source={bike} style={{ width: 100, height: 100 }} />
          </View>

          <Text style={tw`mt-3 text-gray-500`}>
            Your order at {restaurant?.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        showsUserLocation={true}
        followsUserLocation={true}
        zoomEnabled={true}
        initialRegion={{
          latitude: restaurant?.lat || 0,
          longitude: restaurant?.long || 0,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        style={tw`flex-1 -mt-10 z-0`}
        mapType="mutedStandard"
      >
        {/* Marker for Restaurant */}
        {restaurant && (
          <Marker
            coordinate={{
              latitude: restaurant.lat,
              longitude: restaurant.long,
            }}
            title={restaurant.title}
            description={restaurant.short_description}
            identifier="restaurant"
            pinColor="red"
          />
        )}

        {/* Marker for User Location */}
        {userLocation?.location ? (
          <Marker
            coordinate={{
              latitude: userLocation.location.lat,
              longitude: userLocation.location.long,
            }}
            title="Your Location"
            description="This is your current location"
            identifier="user"
            pinColor="blue"
          />
        ) : (
          console.log('User location is not available:', userLocation)
        )}
      </MapView>

      <SafeAreaView style={tw`bg-white flex-row items-center justify-between h-28`}>
        <Image source={bike} style={tw`h-12 w-12 bg-gray-300 rounded-full ml-5`} />
        <View style={tw`flex-1 ml-4`}>
          <Text style={tw`text-lg font-bold`}>Tesla Ogubere</Text>
          <Text style={tw`text-gray-400`}>Your Rider</Text>
        </View>
        <Text style={tw`text-blue-500 text-xl mr-5 font-bold`}>Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default FoodDeliveryScreen;