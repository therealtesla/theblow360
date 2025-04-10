import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useNavigation} from "@react-navigation/native"
import tw from 'tailwind-react-native-classnames';
import {
    UserIcon,ChevronDownIcon,
} from "react-native-heroicons/outline"
import Entypo  from 'react-native-vector-icons/Entypo';
import Categories from '../foodcomponents/Categories';
import FeaturedRow from '../foodcomponents/FeaturedRow';
import sanityClient from '../sanity';
 




const foodImg = require("../assets/food.png");



const FoodScreen = () => {

    const navigation = useNavigation();
    const [featuredCategories,setFeaturedCategories] = useState([]);



    useEffect(() => {
      sanityClient
        .fetch(
          `
            *[_type == "featured"] {
              ...,
              restaurants[]->{
                ...,
                dishes[]->
              }
            }
          `
        )
        .then((data) => setFeaturedCategories(data));
    }, []);


  return (
    <SafeAreaView style = {tw `bg-white pt-5`}>
      {/* Header */}
      <View style = {tw `flex-row pb-3 items-center mx-4`}>
<Image style = {tw `h-7  w-7 bg-gray-300 rounded-full`}

source={foodImg}/>
 

 <View style = {tw `flex-1`}>
    <Text style = {tw ` font-bold text-gray-400 text-xs`}>Welcome</Text>
    <Text style = {tw ` font-bold text-xl`}>Current Location
       <ChevronDownIcon size = {20} color="blue"/>
    </Text>

    
    
    </View>
    <UserIcon size={35} color="blue"/>

 </View>
    {/* Search  */}
    <View style = {tw `flex-row items-center pb-2 mx-4`}>
        <View style = {tw `flex-row bg-gray-200 p-3 rounded-full flex-1`}>
        <Entypo name={"magnifying-glass"} size={24} color="grey"/>
           
            <TextInput placeholder='Restaurant and cusisins'
            keyboardType="default"/>




        </View>
        <Entypo name="adjust" size={24} color="gray" />
       
       


        
    </View>

    {/* Body */}
    <ScrollView style = {tw `bg-gray-100`}
    contentContainerStyle = {{paddingBottom:100,}}
    
    >
        {/* Categories */}
        <Categories/>

        {/* Featured rows */ }
      {featuredCategories?.map(category=>(
          <FeaturedRow
          key={category._id}
          id={category._id}
            title ={category.name}
            description = {category.short_description}
            />

        ))}



    </ScrollView>


    </SafeAreaView>
   

  
  )
} 

export default FoodScreen

