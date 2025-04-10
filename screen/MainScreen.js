import * as React from 'react';
import { SafeAreaView, ScrollView,Text,View ,Image,Modal, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native"
import MyButton from '../components/MyButton';
import { useState } from 'react';
import tw from 'tailwind-react-native-classnames';




const bikeImg = require("../assets/bike.png");
const foodImg = require("../assets/food.png");






const MainScreen = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
        const navigation = useNavigation()
    

    
    return(
        <ScrollView style = {tw ` bg-white`} >
            <View style = {{ paddingHorizontal:5 ,paddingTop:50}}>

                 <View style = {tw `flex-row mt-10 ml-5 `}>
                                  <TouchableOpacity  onPress={() => setIsModalVisible(true)}    style = {{backgroundColor:"white",padding:20,borderRadius:10,
                    shadowColor:"black",shadowOffset:{width:0,height:2}, width:100, 
                    shadowOpacity:0.25,shadowRadius:4,elevation:5, marginTop:5}}>


                         < Image source={bikeImg} style= {{width:50, height:50, resizeMode:'contain'}} />
                         <Text style= {{fontWeight:500}}>Delivery </Text>

                         <Modal visible = {isModalVisible}
                         onRequestClose={()=> setIsModalVisible(false)}
                         animationType="slide"
                         transparent = {true}
                        
                         
                         
                         >


                            
                            <View style = { tw `flex-row bg-red-200  justify-evenly py-2 mt-80 border-t border-gray-100  ` }>
                            <Text style = {tw `font-bold`}> SEND AN ITEM</Text>

                               <TouchableOpacity style = {{backgroundColor:"white",padding:20,borderRadius:10,
                    shadowColor:"black",shadowOffset:{width:0,height:2}, width:100, 
                    shadowOpacity:0.25,shadowRadius:4,elevation:5, marginTop:5}}
                    onPress={()=> navigation.navigate("Delivery")}
                    
                    >
                         < Image source={bikeImg} style= {{width:50, height:50, resizeMode:'contain'}} />
                         <Text style = {tw `font-bold`}>Single Delivery</Text>

                               </TouchableOpacity>
                               <TouchableOpacity style = {{backgroundColor:"white",padding:20,borderRadius:10,
                    shadowColor:"black",shadowOffset:{width:0,height:2}, width:100, 
                    shadowOpacity:0.25,shadowRadius:4,elevation:5, marginTop:5}}>
                         < Image source={bikeImg} style= {{width:50, height:50, resizeMode:'contain'}} />
                         <Text >Multiple Delivery</Text>

                               </TouchableOpacity>


                               


                            </View>
                            <MyButton label='close' onPress={()=>setIsModalVisible(false)}/>

                         </Modal>
                         
                         
                         
                    

                                  </TouchableOpacity>
                                  
                                 <TouchableOpacity
                                   onPress={()=> navigation.navigate("Food")}
                                  
                                  
                                  style = {{backgroundColor:"white",padding:20,borderRadius:10,
                    shadowColor:"black",shadowOffset:{width:0,height:2}, width:100, 
                    shadowOpacity:0.25,shadowRadius:4,elevation:5, marginTop:5, marginLeft:15}}>
                                                 < Image source={foodImg} style= {{width:50, height:50, resizeMode:'contain'}} />
                                                 <Text style= {{fontWeight:500,marginLeft:10}}>Food </Text>
                                                
                                 
                                  
                                 
                                  



                                  </TouchableOpacity> 

                                  {/* events */}
                                  



                                  {/* <TouchableOpacity
                                   onPress={()=> navigation.navigate("Event")}
                                  
                                  
                                  style = {{backgroundColor:"white",padding:20,borderRadius:10,
                    shadowColor:"black",shadowOffset:{width:0,height:2}, width:100, 
                    shadowOpacity:0.25,shadowRadius:4,elevation:5, marginTop:5, marginLeft:15}}>
                                                 < Image source={eventImg} style= {{width:50, height:50, resizeMode:'contain'}} />
                                                 <Text style= {{fontWeight:500,marginLeft:6}}>Events/Tickets </Text>
                                                
                                 
                                  
                                 
                                  



                                  </TouchableOpacity>
                                   */}

                                 
                                </View>
                                </View>



                             
            


        </ScrollView>
          
    )

}


export default MainScreen;


