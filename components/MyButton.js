
import React from 'react'
import  {View ,Text,Pressable,StyleSheet, TouchableOpacity} from 'react-native'



const MyButton = ({
    label = '',
    labelColor,
    backgroundColor,
    borderColor,
    rounded,
    onPressHandler,
    onPress,
    raised = false,
    startIcon,
    endIcon,
    customStyle,
}) =>{
    return(
        <View>
            <TouchableOpacity 
            onPress={onPress}
            
            style = {[styles.button, rounded ?   styles.rounded : '', 
                 backgroundColor ? {backgroundColor:backgroundColor}:{backgroundColor:'white'},
                 borderColor? {borderColor:borderColor}:{borderColor:'white'},
                 labelColor? {labelColor:labelColor}:{labelColor:'white'}
                 
                 ]}>
                <View style = {styles.buttonContainer}>
                <Text
                style = {[styles.buttonText,{color:labelColor}]}>{label}

                </Text>
                </View>
                
            </TouchableOpacity>
        </View>
    );
};

export default MyButton;

const styles  = StyleSheet.create({
    button:{
        height:50,
        width :'100%',
        marginTop:10,
        borderRadius:30,
        borderWidth:2,
        
         

    },
    rounded:{
        borderRadius:30,
    },
    buttonContainer:{
        flexDirection:" row",
        alignItems:'center',
        justifyContent:'center',
        height:'100%'
    },
    buttonText:{
        fontSize:12,
        textTransform:'capitalize',
        fontWeight:500,
    }

});