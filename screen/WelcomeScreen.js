import * as React from 'react';
import {View,Image,Text,ScrollView,Button, TouchableOpacity} from "react-native";
const logoImg = require("../assets/logo.png");
import Mybutton from "../components/MyButton";
import {useNavigation} from "@react-navigation/native"
import tw from 'tailwind-react-native-classnames'
import useLocation from './hook/useLocation';





export default function WelcomeScreen ({}){
    const navigation = useNavigation()
    useLocation();
    return (
        <ScrollView >
        <View style = {tw ` p-10 h-full w-full `}>
       
            <Image source={logoImg} style = {{width:250, height :250, marginTop:150, marginLeft:30}}/>

            <Text style = {{marginTop:60,marginLeft:50 ,marginBottom:100,fontSize:15,fontWeight:"bold"}}>Welcome to Theblow360</Text>

           

            <Mybutton label="Continue with Apple" 
            backgroundColor = "#000000" 
            labelColor= "#FFFFFF"
             


            />

             <Mybutton label="Continue with phone number " borderColor = "#808080" rounded = {false}/> 
            <Mybutton label="Continue with Google " borderColor = "#D3D3D3" />
          
            <Mybutton label="Register " borderColor = "#F0FFFF" backgroundColor="#89CFF0"
             onPress={() => navigation.navigate("SignUp")}/>
         


       
        </View>
        </ScrollView>
    )
}