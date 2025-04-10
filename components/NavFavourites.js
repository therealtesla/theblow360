import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{Component} from 'react'

import tw from 'tailwind-react-native-classnames';
import {Icon} from "react-native-elements"












const data = [
    {
        id :"123",
        icon :"home",
       
         destination:"Current Location",

    }
];


const NavFavourites = () => { 
  return (
    <FlatList 
    data={data}
    keyExtractor={(item)=>item.id}
    ItemSeparatorComponent={()=>(
        <View style = {[tw`bg-gray-200`,{height:1}]}/>
    )}
    renderItem={({item: {location,destination,icon}}) => (
        <TouchableOpacity style = {tw ` flex-row items-center p-5`}>
            <Icon
            style = {tw `mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color= "black"
            size={18}
            
            /> 
            <View>
                
                <Text style  = {tw `text-gray-500`}>{destination}</Text>
            </View>

        </TouchableOpacity>

    )}
    
    
    />
  )
}

export default NavFavourites

const styles = StyleSheet.create({})