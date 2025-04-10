import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'

const CategoryCard = ({imgUrl,title}) => {
  return (
    <TouchableOpacity style = {tw `relative mr-2`}>
      <Image source={{uri:imgUrl}}
      style = {tw `h-20 w-20 rounded-full mt-5`}
      
      />
      <Text style = {tw `absolute  left-4  text-black font-bold`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard

const styles = StyleSheet.create({})