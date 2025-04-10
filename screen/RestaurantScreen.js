import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import {useNavigation, useRoute} from "@react-navigation/native";
import { Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import BasketIcon from '../foodcomponents/basketIcon';
import Entypo from 'react-native-vector-icons/Entypo';


import { ArrowLeftIcon,
   

    StarIcon,
   


 } from 'react-native-heroicons/solid';

import DishRow from '../foodcomponents/DishRow';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';
import { urlFor } from '../sanity';

 


const RestaurantScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    const route = useRoute();

    const {
        params: {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        },
      } = useRoute();
    

      useEffect(() => {
        dispatch(
          setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
          })
        );
      }, []);
 


  return (
    
    <>
    <BasketIcon/>
    <ScrollView>
        <View style = {tw `relative`}>
            <Image
            source = {{uri:urlFor(imgUrl).url(),

            }}
   
    style= {tw `w-full h-72 bg-gray-300`}
            
            />
            <TouchableOpacity 
            onPress={navigation.goBack}
            
        

            
            style = {tw `absolute top-14 left-5 p-2 bg-gray-100 rounded-full`}>
                <ArrowLeftIcon size={20} color="blue"/>

            </TouchableOpacity>
        </View>
        <View style = {tw  `bg-white`}>
            <View style = {tw `px-4 pt-4`}>
                <Text View style = {tw `text-3xl font-bold mb-2 tracking-wide`}>{title}</Text>
                <View View style = {tw `flex-row my-2`}>

                    <View style = {tw ` flex-row items-center`}>
                        <StarIcon color= 'blue' opacity={0.5} size={22}/>
                        <Text style = {tw `text-xs text-gray-500 ml-1 tracking-wider`}>
                        <Text style = {tw ` text-blue-500`}>{rating}</Text> . {genre}
                        </Text>


                    </View>
                    <View style = {tw ` flex-row items-center`}>
                     <Entypo name="location-pin" color="gray" size={22} />
                    



                        
                     
                     <Text style = {tw ` text-gray-500 ml-1 tracking-wide`}>Nearby . {address}</Text> 
                   


                    </View>
                    


                </View>
                <Text  style = {tw ` text-gray-500 mt-2 pb-4 tracking-normal`}>{short_description}</Text>

            </View>
           

         
           
  
        </View>
        <View style = {tw `pb-36`}>
            <Text style = {tw `font-bold px-2 pt-3 text-xl mb-2`}>Menu</Text>
            {/* dishrow */}
           

 {dishes.map((dish) => (
    <DishRow
        key={dish._id}
        id={dish._id}
        name={dish.name}
        description={dish.short_description}
        price={dish.price}
        image={dish.image}
    />
))}

</View>


            







            
                
          
           
        
        

      
    </ScrollView>
    </>
  )
}
 
export default RestaurantScreen
