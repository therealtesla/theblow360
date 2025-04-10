                
                
import * as React from 'react';
import { ScrollView,View ,Image,Text, TextInput,Button,KeyboardAvoidingView,TouchableOpacity} from "react-native"
import MyButton from "../components/MyButton";
import { useState } from "react";
import { Link,useNavigation} from "@react-navigation/native"
import tw from 'tailwind-react-native-classnames';
import { selectTravelTimeInformation } from '../slices/navSlice'
import { useSelector } from 'react-redux'




// if we have surge charge rate
const SURGE_CHARGE_RATE = 1.5;
const multiplier = 460;







const DeliveryDetailScreen = () => {


    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [pack,setPack] = useState("")
    const [instruction,setInstruction] = useState("")
    const travelTimeInformation = useSelector(selectTravelTimeInformation)
    const [selected,setSelected] = useState(null)
    


    



     

     


    return (

        <ScrollView style= {{flex:1  }}>
            <View style= {{flex:1  }}>

                <Text style = {{
                    fontSize:15,
                    fontWeight:'600',
                    marginTop:80,
                    marginLeft:115,
                    marginBottom:20,

                    
                }}
                
                >Purchase  Details</Text>

            </View>
            <View style = {{flex:1 ,justifyContent:"center",paddingHorizontal:10,backgroundColor:"#f5f5f5"}}>
                <View style = {{backgroundColor:"white",padding:20,borderRadius:10,
                    shadowColor:"black",shadowOffset:{width:0,height:2},
                    shadowOpacity:0.25,shadowRadius:4,elevation:5}}>

                    <TextInput style= {{height:50,borderColor:"#ddd",
                        borderWidth:1,marginBottom:15,
                        padding:15,borderRadius:10}} placeholder="Recipient Name" value={name} onChangeText={setName}/>
                    <TextInput style= {{height:50,borderColor:"#ddd",
                        borderWidth:1,marginBottom:15,
                        padding:15,borderRadius:10}}   placeholder="PhoneNumber" value={phoneNumber} onChangeText={setPhoneNumber}/>
                    <TextInput style= {{height:50,borderColor:"#ddd",
                        borderWidth:1,marginBottom:15,
                        padding:15,borderRadius:10}}   placeholder="PackageType" value={pack} onChangeText={setPack}/>
                     <TextInput style= {{height:150,borderColor:"#ddd", textAlignVertical:"top",
                        borderWidth:1,marginBottom:15,minHeight:100,
                        padding:15,borderRadius:10}}   placeholder=" Customer Instruction" multiline value={instruction} onChangeText={setInstruction}/>
                     <Text>Charges</Text>

<View style = {{flex:1 ,justifyContent:"center",paddingHorizontal:10,backgroundColor:"#f5f5f5"}}>
  <View>
   
          

  
   <Text style=  {tw `text-center  py-2`}>Distance -             {travelTimeInformation?.distance.text}</Text>
   <Text  style=  {tw `text-center  py-2`}> TravelTime -         {travelTimeInformation?.duration.text}</Text>

   <Text style = {tw `text-center py-2 font-bold`}> Total     
    {new Intl.NumberFormat('en-ng',
    {style:'currency',
    currency:'NGN'
                 }
         ).format(
                                      - (travelTimeInformation?.duration.value * multiplier)/100

)}




</Text>

    

   
    </View>
</View>
<View style = {tw ` mt-5`}>
                            <Text style = {tw `font-bold mt-2`}>Resposible for Payment</Text>
                            <View style = {{flex:1 ,justifyContent:"center",paddingHorizontal:10,backgroundColor:"#f5f5f5",marginTop:10}}>

                           
                           <TouchableOpacity onPress={()=>{setSelected(1);}}>
                           
                            <View style = {{display:"flex",flexDirection:"row",alignItems:"center"}}>
                           
                                

                         <View style = {{height:20,width:20,borderWidth:1,borderRadius:20,marginTop:10}}>

                            {
                                selected === 1 ? <View style = {{backgroundColor:"blue",flex:1,borderRadius:20,margin:3}}>
                            {''}
                           

                            </View> :null}
                            

                                    

                                    </View>
                                    <Text style = {tw `mt-3 ml-2 font-bold`}>Sender(ME)</Text>
                      
                                </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>{setSelected(2);}}>
                                <View style = {{display:"flex",flexDirection:"row",alignItems:"center"}} >

                               
                                
                                <View style = {{height:20,width:20,borderWidth:1,borderRadius:20,marginTop:20}}>

                                    {
                                        selected === 2 ? <View style = {{backgroundColor:"blue",flex:1,borderRadius:20,margin:3}}>
                                    {''}
                                

                               </View>:null}

                                


                                </View>
                                <Text style = {tw `mt-4 ml-2 font-bold`}>RECEIVER</Text>
                                </View>
                                </TouchableOpacity>



                            </View>
                        </View>






                        <View style = {tw `py-2 justify-evenly  `}>
                            <MyButton label='Reset' borderColor="gray" />
                            <MyButton label='Submit' backgroundColor="green"/>
                        </View>
                              
                </View>
                
                
                
               
                
                
                

            </View>


           

        </ScrollView>

    );
}


export default DeliveryDetailScreen;