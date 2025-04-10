import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import 'react-native-get-random-values';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, setDestination } from '../slices/navSlice';
import {useNavigation} from "@react-navigation/native"
import NavFav from './Navfav';
import { Icon } from 'react-native-elements';


const NavigatePurchaseCard = () => { 
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const destination = useSelector(selectDestination);
  return ( 
    <SafeAreaView style = {tw `bg-white flex-1`}>
      <Text style = {tw `text-center py-5 text-xl`}>Hello Sir/Madam</Text>
      <View style = {tw `border-t border-gray-200 flex-shrink`}>
        <View>
            <GooglePlacesAutocomplete
            placeholder="Delivery"
            styles={toInputBoxStyles}
            fetchDetails={true}
            currentLocationLabel='Current Location'
            currentLocation = {true}
            returnKeyType = {"search"}
            minLength={2}
            onPress={(data,details = null)=>{
                dispatch(setDestination({
                    location:details.geometry.location,
                    description:data.description,
                }))
                navigation.navigate('PurchaseOptionsCard');

            }}
            enablePoweredByContainer={false}
            query={{
                key: 'AIzaSyARsz7FWMaL0miP9EahKAp07HK5xaIkyB4',
                language:"en"
            
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}


            
            />

        </View>
        <NavFav/>
      </View>
      <View style = {tw `flex-row  bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>

       
        <TouchableOpacity 
        
        

        onPress={() =>navigation.navigate("PurchaseOptionsCard")}
        disabled={!destination}
        
        
        style = {tw `flex flex-row bg-green-200 w-24 px-1 py-3 rounded-full`}
        >
            <Icon name = "motorcycle" type = "font-awesome" color="black" size={10}/>
            <Text style = {tw `text-black text-center   ${!destination && "opacity-20"}`}> Purchase </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default NavigatePurchaseCard

const toInputBoxStyles = StyleSheet.create({

    container:{
        backgroundColor:"white",
        paddingTop:20,
        flex:0
    },
    textInput:{
        backgroundColor:"#E5E4E2",
        borderRadius:20

    },
    textInputContainer:{
        paddingHorizontal:20,
        paddingBottom:0,
    }
})