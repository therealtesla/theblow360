import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Animated, Marker } from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import {  selectOrigin, selectDestination, setTravelTimeInformation } from '../slices/navSlice'
import MapViewDirection from "react-native-maps-directions";



const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination)
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const  GOOGLE_API_KEY = 'AIzaSyARsz7FWMaL0miP9EahKAp07HK5xaIkyB4'

    useEffect(() =>{
        if (!origin || !destination) return;

        // Zoom & fit to markers
        mapRef.current.fitToSuppliedMarkers(
            ['origin', 'destination'],{
                edgepadding:{top:150, right:50,bottom:150,left:50,animated:true},
            }

        );

       
    }, [origin,destination]);

    useEffect(()=>{
        if (!origin || !destination) return;


        const getTravelTime = async() =>{
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
            units=imperial&origins=${origin.description}&destinations=${destination.description}
            &key=${GOOGLE_API_KEY}`)
            .then(res => res.json())
            .then(data=>{
              dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
            })
            
            

        };
        getTravelTime();

    },[origin,destination,GOOGLE_API_KEY]);




  return (

    <MapView
    ref={mapRef}
    style= {tw `flex-1`}
    mapType="none"
    showsUserLocation = {true} 
    followsUserLocation = {true}
    zoomEnabled={true}
    
    initialRegion={{
        latitude:origin.location.lat, 
        longitude:origin.location.lng,
        latitudeDelta:0.005,
        longitudeDelta:0.005,
    }}

    >
        {origin && destination && (
            <MapViewDirection
            origin={origin.description}
            destination={destination.description}
            apikey={GOOGLE_API_KEY}
            strokeWidth={3}
            strokeColor="blue"
            
            
            />


        )}
        { origin?.location && (
            <Marker
            coordinate={{
                latitude:origin.location.lat,
                longitude:origin.location.lng,
            }}
            title="Origin"
            description={origin.description}
            identifier="origin"
           
            
            
            />
        )

    }
    { destination?.location && (
            <Marker
            coordinate={{
                latitude:destination.location.lat,
                longitude:destination.location.lng,
            }}
            title="Destination"
            description={destination.description}
            identifier="destination"
           
            
            
            />
        )

    }
    </MapView>
    
    
    
   
  );
};

export default Map

const styles = StyleSheet.create({})