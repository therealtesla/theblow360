import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin, setOrigin } from '../slices/navSlice'; // Assuming user location is stored in navSlice
import { XCircleIcon } from 'react-native-heroicons/outline';
import bike from '../assets/bike.png'; // Adjust the path to where your image is located
import * as Location from 'expo-location'; // Import location library
import MapView, { Marker } from 'react-native-maps'; // Import MapView from react-native-maps

const FoodDeliveryScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const restaurant = useSelector(selectRestaurant); // Retrieve restaurant data from Redux store
  const userLocation = useSelector(selectOrigin); // Retrieve user location from Redux store

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
              <Text style={tw`text-4xl font-bold mr-4`}>45-55 Minutes</Text>
            </View>
            <Image source={bike} style={{ width: 100, height: 100 }} />
          </View>

          <Text style={tw`mt-3 text-gray-500`}>
            Your order at {restaurant?.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>

      <MapView
       
      
       
       showsUserLocation = {true} 
       followsUserLocation = {true}
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