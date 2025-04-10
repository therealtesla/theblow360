import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useRef, useState } from 'react'
// import * as Location from 'expo-location'

const useLocation = () => {
    const [errorMsg,setErrorMsg]=useState("");
    const [longitude,setLongitude]=useState("");
    const [latitude,setLatitude]=useState("");
    const [latlng,setLatLng] = useState({})
   



    const checkPermission = async()=>{
        const hasPermisson = await Location.requestForegroundPermissionsAsync();
        if(hasPermisson.status === 'granted'){
            const permisson = await askPermission();
            return permisson
             
        }
        return true

    };
    const askPermission = async()=>{
        const permission = await Location.requestForegroundPermissionsAsync()
        return permission.status === 'granted';
    };

    const getUserLocation = async()=>{
        try{
            const {granted} = await Location.requestForegroundPermissionsAsync();
            if(!granted)return;
            const {
                coords:{latitude,longitude},
            }= await Location.getCurrentPositionAsync();
            setLatLng({latitude:latitude,longitude:longitude })

        }catch (err){

        }
    }
    const mapref = useRef(1);

    useEffect(()=>{
        checkPermission()
        getUserLocation()
       

    ,[]})

    const getLocation = async() =>{
        let {status} = await Location.requestBackgroundPermissionsAsync();  
 
        if(status !== 'granted'){
            setErrorMsg('Permission to location was not granted');
            return;
        }

        let {coords} = await Location.getCurrentPositionAsync();
        

        if(coords){
            const {latitude, longitude} = coords;
            console.log("lat and long is",latitude,longitude);
            setLatitude(latitude);
            setLongitude(longitude);

            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });

           
        }
        };

        useEffect(()=>{
            getUserLocation();
            getLocation();

        },[])

        return{latitude,longitude,errorMsg,latlng};


     }



  


export default useLocation

