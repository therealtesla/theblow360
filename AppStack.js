import * as React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import WelcomeScreen from "../theblow360/screen/WelcomeScreen";
import SignInScreen from './screen/SignInScreen';
import SignUpScreen from './screen/SignUpScreen';
import MainScreen from './screen/MainScreen';
import DeliveryScreen from './screen/DeliveryScreen';
import {Provider} from "react-redux";
import { store } from './store';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import "react-native-gesture-handler"
import MapDeliveryScreen from './screen/MapDeliveryScreen';
import MapPurchaseScreen from './screen/MapPurchaseScreen';
import DeliveryDetailScreen from './screen/DeliveryDetailScreen';
import PurchaseDetailScreen from './screen/PurchaseDetailScreen'
import PaymentScreen from './screen/PaymentScreen';
import FoodScreen from './screen/FoodScreen';
import EventScreen from './screen/EventScreen';
import RestaurantScreen from './screen/RestaurantScreen';
import BasketScreen from './screen/BasketScreen';
import PreparingOrderScreen from './screen/PreparingOrderScreen';
import FoodDeliveryScreen from './screen/FoodDeliveryScreen';
import CheckOutScreen from './screen/CheckOutScreen';
import FoodPaymentScreen from './screen/FoodPaymentScreen';










 const Stack = createNativeStackNavigator();


export default function App() { 
  return (
    <Provider store={store}>
    
      <NavigationContainer >

      <SafeAreaProvider>
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding":"height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        
        style = {{flex :1}}>
        <Stack.Navigator initialRouteName='Home'>
    
    
        <Stack.Screen name = "Home" component={WelcomeScreen} options= {{headerShown:false}} />
        <Stack.Screen name = "SignUp" component={SignUpScreen}options= {{headerShown:false}} />
        <Stack.Screen name = "SignIn" component={SignInScreen} options= {{headerShown:false}}/>
        <Stack.Screen name = "Main" component={MainScreen} options= {{headerShown:false}}/>
        <Stack.Screen name = "Delivery" component={DeliveryScreen} options= {{headerShown:false}}/>
        <Stack.Screen name = "MapDelivery" component={MapDeliveryScreen} options= {{headerShown:false}}/>
        <Stack.Screen name = "MapPurchase" component={MapPurchaseScreen} options= {{headerShown:false}}/>
        <Stack.Screen name = "DeliveryDetail" component={DeliveryDetailScreen} options= {{headerShown:false}}/>
        <Stack.Screen name = "PurchaseDetail" component={PurchaseDetailScreen} options= {{headerShown:false}}/>
        <Stack.Screen name = "Payment" component={PaymentScreen} options= {{headerShown:false}}/>
        <Stack.Screen name = "Food" component={FoodScreen} options= {{headerShown:false}}/>
        <Stack.Screen name = "Event" component={EventScreen} options= {{headerShown:false}}/>
        <Stack.Screen name = "Restaurant" component={RestaurantScreen} options= {{headerShown:false}}/>
        <Stack.Screen name = "Basket" component={BasketScreen} options = {{presentation:"modal",headerShown:false}}/>
        <Stack.Screen name = "PreparingOrder" component={PreparingOrderScreen} options= {{ presentation:'fullScreenModal', headerShown:false}}/>
        <Stack.Screen name = "FoodDelivery" component={FoodDeliveryScreen} options= {{ presentation:'fullScreenModal', headerShown:false}}/>
        <Stack.Screen name = "CheckOut" component={CheckOutScreen} options= {{headerShown:false}}/>
        <Stack.Screen name = "FoodPayment" component={FoodPaymentScreen} options= {{headerShown:false}}/>
        
   
        
   

        </Stack.Navigator>
      
        



        
          
        

     

        </KeyboardAvoidingView>
   
    </SafeAreaProvider>

    </NavigationContainer>
    </Provider>

   
  );

  
  
}