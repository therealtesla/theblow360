
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React ,{Component} from 'react'

import tw from 'tailwind-react-native-classnames';
import {Icon} from "react-native-elements"


const data = [
     {
        id :"456",
        icon :"briefcase",
        location:"Delivery",
        destination:"Address"
    },
];


const NavFav = () => { 
  return (
    <FlatList 
    data={data}
    keyExtractor={(item)=>item.id}
    ItemSeparatorComponent={()=>(
        <View style = {[tw`bg-gray-200`,{height:1}]}/>
    )}
    renderItem={({item: {location,destination,icon}}) => (
        <TouchableOpacity style = {tw ` flex-row items-center p-5`}>
            
            

        </TouchableOpacity>

    )}
    
    
    />
  )
}

export default NavFav

const styles = StyleSheet.create({})