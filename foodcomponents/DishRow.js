import { StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { formatCurrency } from 'react-native-format-currency';
import { MinusCircleIcon } from 'react-native-heroicons/solid'
import { PlusCircleIcon } from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItems } from '../features/basketSlice'
import { selectBasketItemsWithId } from '../features/basketSlice'
import { urlFor } from '../sanity'




const DishRow = (
    {id,name,description,price,image}
) => {

    const [formattedCurrency] = formatCurrency({
        amount: price,
        code: 'NGN',
      });
    


    const [isPressed,setIspressed] = useState(false); 
    const dispatch = useDispatch();
    const items = useSelector((state) => selectBasketItemsWithId(state,id));
   const addItemToBasket = () => {
    dispatch(addToBasket({
        id,name,description,price,image
    }));
   };

   
   const removeItemFromBasket = () =>{
    if (!items.length > 0)return;
    dispatch (removeFromBasket({id}));



    
    };
 
 


  return (
    <>

    <TouchableOpacity onPress={()=> setIspressed(!isPressed)}
    
    style ={tw `bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"}`}>
        <View style ={tw `flex-row`}>
        <View style = {tw `flex-1 pr-2`}>
           
            <Text style = {tw `text-lg mb-1`}>{name}</Text>
            <Text style = {tw `text-gray-400`}>{description}</Text>
             <Text style = {tw `text-gray-400 mt-2`}>
             
             <Text style={tw`text-gray-400 mt-2`}> NGN {formattedCurrency}</Text>
             
             
            </Text> 
      
        </View>
        <View>
            <Image 
            style = {tw `h-20 w-20 bg-gray-300 p-4 rounded-full`}
            
            
             source = {{uri:urlFor(image).url()}}



            
            
            
            />
            
           
          
          
        </View>
        </View>
        
    </TouchableOpacity>

    {isPressed && (
        <View style = {tw `bg-white px-4`}>
            <View style = {tw `flex-row items-center pb-3` }>
                <TouchableOpacity
                disabled={!items.length}
              
                onPress={removeItemFromBasket}>
                    <MinusCircleIcon
                    color = {items.length > 0 ? "#1F51FF" : "gray"}
                  
                  
                    size={40} 
                    />
                    </TouchableOpacity>
  
                    <Text>{items.length}</Text>

                    <TouchableOpacity onPress={addItemToBasket}>
                    <PlusCircleIcon
                  
                    size={40} 
                    />
                    </TouchableOpacity>

            </View>
        </View>

    )}
    </>
    
    
  )
}

export default DishRow

