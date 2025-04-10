import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import tw from 'tailwind-react-native-classnames';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';
import { XCircleIcon } from 'react-native-heroicons/outline';
import bike from '../assets/bike.png'; // Adjust the path to where your image is located
import * as Progress from 'react-native-progress'; // Import the progress library
import MapView, { Marker } from 'react-native-maps'; // Import MapView from react-native-maps

const FoodDeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant); // Retrieve restaurant data from Redux store


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

          {/* Progress Bar */}
          {/* <Progress.Bar
            size={30}
            color="blue" 
            indeterminate={true}
          /> */}

          <Text style={tw`mt-3 text-gray-500`}>
            Your order at {restaurant?.title} is being prepared
            
          </Text>
        </View>
      </SafeAreaView>

      <MapView

        initialRegion={{
          latitude: restaurant?.lat,
          longitude: restaurant?.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
      
        }}
        style={tw`flex-1 -mt-10 z-0`}
        mapType="mutedStandard"

        >
          <Marker
          coordinate={{
            latitude: restaurant?.lat,
          longitude: restaurant?.long,
          }}
          title={restaurant?.title}
          description={restaurant?.short_description}
          identifier="origin"
          pinColor="Red"

         

          
          
          
          />

          
        </MapView>

      <SafeAreaView style={tw`bg-white flex-row items-center justify-between h-28`}>
        
       <Image source={bike} style={tw `h-12 w-12 bg-gray-300 rounded-full ml-5`} />

       <View style={tw`flex-1 ml-4`}>
        <Text style={tw`text-lg font-bold`}>
          Tesla Ogubere
        </Text>
        <Text style={tw`text-gray-400`}>
          Your Rider
        </Text>
       </View>

       <Text style = {tw `text-blue-500 text-xl mr-5 font-bold`}>Call</Text>
        
      
      
         
        </SafeAreaView>





    


    </View>
  );
};

export default FoodDeliveryScreen; 
