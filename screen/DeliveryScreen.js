
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import * as Location from 'expo-location';

const DeliveryScreen = () => {
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentAddress, setCurrentAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const searchRef = useRef(null); // Reference for GooglePlacesAutocomplete

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      // Reverse geocode to get the address
      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Format the address (e.g., street, city, region)
      if (address.length > 0) {
        const { street, city, region, country } = address[0];
        setCurrentAddress(`${street}, ${city}, ${region}, ${country}`);
      }
    })();
  }, []);

  const handleCurrentLocationClick = () => {
    if (currentAddress && currentLocation) {
      // Programmatically set the value in the search bar
      searchRef.current?.setAddressText(currentAddress);

      // Dispatch the current location as the origin
      dispatch(
        setOrigin({
          location: {
            lat: currentLocation.latitude,
            lng: currentLocation.longitude,
          },
          description: currentAddress,
        })
      );

      dispatch(setDestination(null));
    }
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Text style={tw`font-bold  text-lg mt-5 mb-5`}>Book for yourself or someone</Text>

        {currentLocation ? (
          <TouchableOpacity onPress={handleCurrentLocationClick}>
            <Text style={tw`text-gray-500 mb-5 bg-blue-100 rounded-full p-3 w-30 h-30 font-bold`}>
              Current Location: {currentAddress || 'Fetching address...'}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={tw`text-gray-500 mb-5`}>
            {errorMsg || 'Fetching current location...'}
          </Text>
        )}

        <GooglePlacesAutocomplete
          ref={searchRef} // Attach the ref
          placeholder="Type your location or store location here."
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              backgroundColor: '#E5E4E2',
              borderRadius: 20,
            },
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={'search'}
          enablePoweredByContainer={false}
          minLength={2}
          currentLocation={true}
          currentLocationLabel="Current Location"
          query={{
            key: 'AIzaSyARsz7FWMaL0miP9EahKAp07HK5xaIkyB4',
            language: 'en',
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          autoFocus={true}
          listViewDisplayed="auto"
        />

        <NavOptions />
        {/* <NavFavourites /> */}
      </View>
    </SafeAreaView>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({});