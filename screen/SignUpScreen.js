import * as React from 'react';
import { ScrollView,View ,Image,Text, TextInput,Button,KeyboardAvoidingView} from "react-native"
import MyButton from "../components/MyButton";
import { useState } from "react";
import { Link,useNavigation} from "@react-navigation/native"




const logoImg = require("../assets/logo.png");

const SignUpScreen = () => {
    const navigation = useNavigation()

    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")





     

     


    return (

        <ScrollView style= {{flex:1,  backgroundColor:"white" }}>
            <View style= {{flex:1 }}>
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
                
                >Create Your Account</Text>

            </View>
            <View style = {{flex:1 ,justifyContent:"center",paddingHorizontal:10,backgroundColor:"white"}}>
                <View >

                    <TextInput style= {{height:50,borderColor:"#ddd",
                        borderWidth:3,marginBottom:15,backgroundColor:"white",
                        padding:15,borderRadius:10}} placeholder="Email" value={email} onChangeText={setEmail}/>
                    <TextInput style= {{height:50,borderColor:"#ddd",
                        borderWidth:3,marginBottom:15,backgroundColor:"white",
                        padding:15,borderRadius:10}}   placeholder="PhoneNumber" value={phoneNumber} onChangeText={setPhoneNumber}/>
                    <TextInput   style= {{height:50,borderColor:"#ddd",
                        borderWidth:3,marginBottom:15,backgroundColor:"white",
                        padding:15,borderRadius:10}} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword}/>
                    <TextInput    style= {{height:50,borderColor:"#ddd",
                        borderWidth:3,marginBottom:15,backgroundColor:"white",
                        padding:15,borderRadius:10}} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword}/>

                        <MyButton label="Sign Up" backgroundColor="#89CFF0"/>

                </View>
                <Text style = {{marginLeft:100, marginTop:50}}>
                Already Have an Account? 
                   </Text>
                   <Button title="sign in" onPress={() => navigation.navigate("SignIn")}/>
               
                
                
                

            </View>


           

        </ScrollView>

    );
}


export default SignUpScreen;