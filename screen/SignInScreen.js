import * as React from 'react';
import { ScrollView,View ,Image,Text, TextInput,Button,KeyboardAvoidingView,} from "react-native"
import MyButton from "../components/MyButton";
import { useState } from "react";
import {Link, useNavigation} from "@react-navigation/native"
import tw from 'tailwind-react-native-classnames';



const logoImg = require("../assets/logo.png");

const SignInScreen = () => {

      const navigation = useNavigation()

    const [email, setEmail] = useState("")
    
    const [password, setPassword] = useState("")
    





     

     


    return (

        <ScrollView style= {tw ` bg-white`}>
            <View style= {{flex:1  }}>
                <Image 

                source={logoImg}
                style = {{width:100, height:100,
                    marginLeft:150,

                    marginTop:150,
                }}
                />
                <Text style = {{
                    fontSize:20,
                    fontWeight:'600',
                    marginTop:40,
                    marginLeft:100,
                    marginBottom:20,

                    
                }}
                
                >WELCOME.</Text>

            </View>
            <View style = {{flex:1 ,justifyContent:"center",paddingHorizontal:20,backgroundColor:"white"}}>
                <View >

                    <TextInput style= {{height:50,borderColor:"#ddd",
                        borderWidth:3,marginBottom:15,backgroundColor:"white",
                        padding:15,borderRadius:10}} placeholder="Email" value={email} onChangeText={setEmail}/>
                    
                    <TextInput   style= {{height:50,borderColor:"#ddd",
                        borderWidth:3,marginBottom:15,backgroundColor:"white",
                        padding:15,borderRadius:10}} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword}/>

                        <Link style= {{marginLeft:200, fontSize:10}}>forgot Password?</Link>
            
                        <MyButton label="Sign In" backgroundColor="#89CFF0" onPress={()=> navigation.navigate("Main")}/>

                </View>
                <Text style = {{marginLeft:100, marginTop:50}}>
                Dont have an Account? 
                   
                </Text>
                <Button title="sign up" onPress={() => navigation.navigate("SignUp")}/>

                
                
                    
             
                

            </View>


           

        </ScrollView>

    );
}


export default SignInScreen;