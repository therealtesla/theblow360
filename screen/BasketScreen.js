import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems } from '../features/basketSlice';
import tw from 'tailwind-react-native-classnames';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { formatCurrency } from 'react-native-format-currency';
import { urlFor } from '../sanity';
import * as Location from 'expo-location';
import { setDeliveryFee, selectDeliveryFee } from '../features/deliveryFeeSlice';
import { getDistance } from 'geolib';

const bikeImg = require("../assets/bike.png");

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const deliveryFee = useSelector(selectDeliveryFee);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const [distanceInKm, setDistanceInKm] = useState(0); // Added state for distance
  const [deliveryTime, setDeliveryTime] = useState(""); // Added state for delivery time

  // Calculate the total cost of items in the basket
  const basketTotal = items.reduce((total, item) => total + Number(item.price || 0), 0);
  const [formattedCurrency] = formatCurrency({
    amount: basketTotal,
    code: 'NGN',
  });

  const [formattedTotalWithDelivery] = formatCurrency({
    amount: basketTotal + deliveryFee,
    code: 'NGN',
  });

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  // Calculate delivery fee, distance, and time dynamically
  useEffect(() => {
    const calculateDeliveryDetails = async () => {
      try {
        // Get user's current location
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Location permission denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const userCoords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        const restaurantCoords = {
          latitude: restaurant.lat,
          longitude: restaurant.long,
        };

        // Calculate distance in meters
        const distance = getDistance(userCoords, restaurantCoords);

        // Convert distance to kilometers and set it
        const distanceKm = (distance / 1000).toFixed(2); // Convert to KM and round to 2 decimal places
        setDistanceInKm(distanceKm);

        // Estimate delivery time (e.g., 5 minutes per km)
        const estimatedTime = Math.ceil(distanceKm * 5+50); // 5 minutes per km
        setDeliveryTime(`${estimatedTime} mins`);

        // Set delivery fee based on distance (e.g., NGN 100 per km)
        const fee = Math.ceil(distance / 1000) * 450; // NGN 100 per km
        dispatch(setDeliveryFee(fee));
      } catch (error) {
        console.error('Error calculating delivery details:', error);
      }
    };

    calculateDeliveryDetails();
  }, [restaurant, dispatch]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 bg-gray-100`}>
        <View style={tw`p-5 border-b bg-white border-blue-100`}>
          <View>
            <Text style={tw`text-lg font-bold text-center`}>Basket</Text>
            <Text style={tw`text-center text-gray-500`}>{restaurant.title}</Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            style={tw`rounded-full bg-gray-100 absolute top-3 right-5`}
          >
            <XCircleIcon color="blue" height={50} width={50} />
          </TouchableOpacity>
        </View>
        <View style={tw`flex-row items-center py-3 px-4 my-5 bg-white`}>
          <Image
            source={bikeImg}
            style={tw`h-7 w-7 bg-gray-300 rounded-full mx-2`}
          />
           <Text style={tw`flex-1 p-4 `}>Deliver in {deliveryTime} ({distanceInKm} KM away)</Text>
        
          <TouchableOpacity>
            <Text style={tw`text-blue-500 ml-3 `}>Change</Text>
            
          </TouchableOpacity>
          
        </View>
        <ScrollView>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View key={key} style={tw`flex-row items-center bg-white py-2 px-5`}>
              <Text>{items.length} X</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                style={tw`h-7 w-7 ml-3 rounded-full`}
              />
              <Text style={tw`flex-1 ml-3`}>{items[0]?.name}</Text>
              <Text style={tw`text-gray-400 mt-2 mr-4`}>NGN {formattedCurrency}</Text>
              <TouchableOpacity>
                <Text
                  style={tw`text-blue-500 text-xs mt-2`}
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View style={tw`p-5 bg-white mt-5`}>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-gray-400`}>Subtotal</Text>
            <Text style={tw`text-gray-400`}>NGN {formattedCurrency}</Text>
          </View>
          <View style={tw`flex-row justify-between mt-2`}>
            <Text style={tw`text-gray-400`}>Delivery Fee</Text>
            <Text style={tw`text-gray-400`}>NGN {deliveryFee}</Text>
          </View>
          <View style={tw`flex-row justify-between mt-2`}>
            <Text style={tw`font-bold`}>Total</Text>
            <Text style={tw`font-bold`}>NGN {formattedTotalWithDelivery}</Text>
          </View>
          <TouchableOpacity
            style={tw`bg-blue-500 rounded-lg p-4 mt-5`}
            onPress={() => navigation.navigate("CheckOut")}
          >
            <Text style={tw`text-center text-white font-bold text-lg`}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({});