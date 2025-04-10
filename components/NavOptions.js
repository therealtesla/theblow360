import {  FlatList, Text, TouchableOpacity, View,Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import {useNavigation} from "@react-navigation/native"
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'

const data = [
    {
        id:"123",
        title:"Delivery",
        image:"https://i.ibb.co/7MNPq1z/boxdelivery.png",
        description:"Send an item from point A to B",
        screen:"MapDelivery"
        

    },

    {
        id:"456",
        title:"Purchase",
        image:"https://i.ibb.co/VWQjzpNK/boxpurchase.png",
         description:"Get a rider to buy something in-store",
          screen:"MapPurchase"
        
    }
]

const NavOptions = () => {
    const origin = useSelector(selectOrigin);
   const navigation = useNavigation();
  return (
    <FlatList
    data={data}
    keyExtractor={(item) => item.id}
    horizontal
    renderItem={({item}) =>(
        <TouchableOpacity
        onPress={()=>navigation.navigate(item.screen)}
        disabled={!origin}


        
        style = {tw `p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 rounded-xl w-40 border-2 border-gray-300`}>
           <View style= {tw `${!origin && "opacity-20"}`}>
            <Image 
            style = {{width:120,height:120, resizeMode:"contain"}}
            
            source={{uri:item.image}}
            />
            <Text style=  {tw `mt-2 ml-6 font-semibold`}>{item.title}</Text>
            <Text style=  {tw `mt-2 font-thin text-sm  `}>{item.description} </Text>
           </View>
        </TouchableOpacity>
    )}
    
    />
  )
}

export default NavOptions

