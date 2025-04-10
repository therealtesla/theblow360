import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState ,useRef} from 'react'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import 'react-native-get-random-values';
import { useDispatch } from 'react-redux';
import { setDestination,selectDestination } from '../slices/navSlice';
import {useNavigation} from "@react-navigation/native"
import NavFav from './Navfav';
import { Icon } from 'react-native-elements';
import {  useSelector } from 'react-redux';


const NavigateCard = () => { 
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const destination = useSelector(selectDestination);
    const textInput1 = useRef(2)
   
  return ( 
    <SafeAreaView style = {tw `bg-white flex-1`}>
      <Text style = {tw `text-center py-5 text-xl`}>Hello Sir/Madam</Text> 
      <View style = {tw `border-t border-gray-200 flex-shrink`}>
        <View>
            <GooglePlacesAutocomplete
            placeholder="Delivery"
            styles={toInputBoxStyles}
             listViewDisplayed = "auto" 
            fetchDetails={true}
            currentLocation = {true}
            currentLocationLabel='Current Location'
            returnKeyType = {"search"}
            
             ref={textInput1}
            minLength={2}
            onPress={(data,details = null)=>{
                dispatch(setDestination({
                    location:details.geometry.location,
                    description:data.description,
                }))
                navigation.navigate('RideOptionsCard');

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
        onPress={() =>navigation.navigate("RideOptionsCard")}
        disabled={!destination}
        
        style = {tw `flex flex-row bg-black w-24 px-4 py-3 rounded-full`}>
            <Icon name = "motorcycle" type = "font-awesome" color="white" size={10}/>
            <Text style = {tw `text-white text-center${!destination && "opacity-20"}`}>Delivery</Text>
        </TouchableOpacity>
        

      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

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