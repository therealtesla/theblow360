import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons'; // Import location icon
import * as Location from 'expo-location'; // For geocoding (optional if using an API)
import { Picker } from '@react-native-picker/picker'; // Import Picker for delivery options
import { useNavigation } from "@react-navigation/native";

const CheckOutScreen = () => {
     const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant); // Get restaurant details from Redux
  const [restaurantInstruction, setRestaurantInstruction] = useState('');
  const [deliveryInstruction, setDeliveryInstruction] = useState('');
  const [realAddress, setRealAddress] = useState(''); // State for the real address
  const [deliveryType, setDeliveryType] = useState('Home Delivery'); // State for delivery type
   const [currentAddress, setCurrentAddress] = useState("Fetching location...");
  






  useEffect(() => {
    const fetchLocation = async () => {
        try {
            // Request location permissions
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setCurrentAddress("Permission denied");
                return;
            }

            // Get user's current location
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            // Use reverse geocoding to get the address
            const reverseGeocode = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            if (reverseGeocode.length > 0) {
                const { street, city, region, country } = reverseGeocode[0];
                setCurrentAddress(`${street || 'Unknown Street'}, ${city || 'Unknown City'}, ${region || 'Unknown Region'}, ${country || 'Unknown Country'}`);
            } else {
                setCurrentAddress("Unable to determine location");
            }
        } catch (error) {
            console.error("Error fetching location:", error);
            setCurrentAddress("Error fetching location");
        }
    };

    fetchLocation();
}, []);
  useEffect(() => {
    const fetchAddress = async () => {
      if (restaurant?.lat && restaurant?.long) {
        try {
          // Use Expo Location API to reverse geocode
          const [address] = await Location.reverseGeocodeAsync({
            latitude: restaurant.lat,
            longitude: restaurant.long,
          });
          setRealAddress(`${address.name}, ${address.city}, ${address.region}, ${address.country}`);
        } catch (error) {
          console.error('Error fetching address:', error);
          setRealAddress('Unable to fetch address');
        }
      }
    };

    fetchAddress();
  }, [restaurant]);

  const handleProceedToPay = () => {
    // Handle payment logic here
    console.log('Proceeding to payment...');
    console.log('Delivery Type:', deliveryType);
  };

  return (
    <ScrollView style={tw`bg-gray-100 flex-1`}>
  {/* Restaurant Details */}
  <View style={tw`p-5 border-b border-gray-300 bg-white`}>
    <Text style={tw`text-2xl font-bold text-blue-600`}>{restaurant?.title}</Text>
    <View style={tw`flex-row items-center mt-2`}>
      <Ionicons name="location-outline" size={20} color="blue" />
      <Text style={tw`text-gray-600 ml-2`}>{realAddress || 'Fetching address...'}</Text>
    </View>
  </View>

  {/* Delivery Type */}
  <View style={tw`p-5 border-b border-gray-300 bg-white`}>
    <Text style={tw`text-lg font-bold text-blue-600 mb-2`}>Delivery Type</Text>
    <Picker
      selectedValue={deliveryType}
      onValueChange={(itemValue) => setDeliveryType(itemValue)}
      style={tw`border border-gray-300 rounded-lg bg-gray-50 w-50 h-40`}
    >
      <Picker.Item label="Home Delivery" value="Home Delivery" />
      {/* <Picker.Item label="Take Away" value="Take Away" /> */}
    </Picker>
  </View>

  {/* Instructions for Restaurant */}
  <View style={tw`p-5 border-b border-gray-300 bg-white`}>
    <Text style={tw`text-lg font-bold text-blue-600 mb-2`}>Instruction for Restaurant</Text>
    <TextInput
      style={tw`border border-gray-300 rounded-lg p-3 h-20 bg-gray-50`}
      placeholder="Add any special instructions for the restaurant"
      value={restaurantInstruction}
      onChangeText={setRestaurantInstruction}
      multiline={true}
    />
  </View>

  {/* Delivery Instructions */}
  <View style={tw`p-5 border-b border-gray-300 bg-white`}>
    <Text style={tw`text-lg font-bold text-blue-600 mb-2`}>Delivery Instructions</Text>
    <TextInput
      style={tw`border border-gray-300 rounded-lg p-3 h-20 bg-gray-50`}
      placeholder="Add delivery instructions"
      value={deliveryInstruction}
      onChangeText={setDeliveryInstruction}
      multiline={true}
    />
  </View>

  {/* Delivery Address */}
  {deliveryType === 'Home Delivery' && (
    <View style={tw`p-5 border-b border-gray-300 bg-white`}>
      <Text style={tw`text-lg font-bold text-blue-600 mb-2`}>Delivery Address</Text>
      <View style={tw`flex-row items-center`}>
        <Ionicons name="location-outline" size={20} color="blue" />
        <Text style={tw`text-gray-600 text-sm mt-1 ml-2`}>
          {currentAddress}
        </Text>
      </View>
    </View>
  )}

  {/* Payment Method */}
  <View style={tw`p-5 border-b border-gray-300 bg-white`}>
    <Text style={tw`text-lg font-bold text-blue-600 mb-2`}>Payment Method</Text>
    <Text style={tw`text-gray-600`}>Credit Card or Cash</Text>
  </View>

  {/* Proceed to Pay Button */}
  <View style={tw`p-5`}>
    <TouchableOpacity
      style={tw`bg-blue-500 p-4 rounded-lg shadow-lg`}
      onPress={() => navigation.navigate("FoodPayment")}
    
    >
      <Text style={tw`text-white text-center text-lg font-bold`}>
        Proceed to Pay
      </Text>
    </TouchableOpacity>
  </View>
</ScrollView>
  );
};

export default CheckOutScreen;

const styles = StyleSheet.create({});