import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import Map from '../components/Map'
import {createStackNavigator} from "@react-navigation/stack";
import NavigatePurchaseCard from '../components/NavigatePurchaseCard';
import PurchaseOptionsCard from '../components/PurchaseOptionsCard';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import {useNavigation} from "@react-navigation/native";






const MapPurchaseScreen = () => {
  const Stack = createStackNavigator();
   const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity 
      onPress={()=> navigation.navigate("Main")}

     
      style = {tw `bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
        <Icon name="menu"/>

      </TouchableOpacity>

      

      <View style = {tw `h-1/2`}><Map/></View> 
      <View style= {tw `h-1/2`}>
      <Stack.Navigator>
        <Stack.Screen

        name="NavigatePurchaseCard"
        component={NavigatePurchaseCard}
        options={{headerShown:false,}}
        
        
        />
        <Stack.Screen

name="PurchaseOptionsCard"
component={PurchaseOptionsCard}
options={{headerShown:false,}}


/>

      </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapPurchaseScreen 

