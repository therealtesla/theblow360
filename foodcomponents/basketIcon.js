 import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
 import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems } from '../features/basketSlice'
import {useNavigation} from "@react-navigation/native"
import { selectBasketTotal } from '../features/basketSlice'
import tw from 'tailwind-react-native-classnames'
import { formatCurrency } from 'react-native-format-currency';

 
 const BasketIcon = () => {
    const items = useSelector(selectBasketItems)
    const navigation = useNavigation()
    const basketTotal = useSelector(selectBasketTotal)

    if (items.length === 0 ) return null;



        const [formattedCurrency] = formatCurrency({
            amount: basketTotal,
            code: 'NGN',
          });
        

   return (
     <View style = {tw `absolute bottom-10 w-full z-50`}>
    <TouchableOpacity onPress={()=>navigation.navigate("Basket")}
    
    
    style = {tw `bg-blue-300 mx-5 p-4 rounded-lg flex-row items-center `  }>
        <Text style = {tw `text-white  font-extrabold text-lg bg-blue-700 mx-2 py-1 px-3`}>{items.length}</Text>

        <Text style = {tw `flex-1 text-white  font-extrabold text-lg text-center`} >View Basket</Text>


        <Text style = {tw `text-lg text-white font-extrabold mx-3`}>
        <Text style={tw`text-gray-400 mt-2`}> NGN {formattedCurrency}</Text>

           
        </Text>

    </TouchableOpacity>
     </View>
   )
 }
 
 export default BasketIcon
 
