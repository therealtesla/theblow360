import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [
  {
    id: 123,
    title: "MotorCycle",
    multiplier: 230,
    image: "https://i.ibb.co/7MNPq1z/boxdelivery.png",
  }
];

// Surge charge rate
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          SELECT PICKUP - {travelTimeInformation?.distance.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 py-5 ${
              id === selected?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
                marginRight: 20,
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-sm font-semibold ml-6`}>{title}</Text>
              <Text>{travelTimeInformation?.duration.text} travel time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-ng', {
                style: 'currency',
                currency: 'NGN',
              }).format(
                (travelTimeInformation?.duration.value * multiplier * SURGE_CHARGE_RATE) / 100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("DeliveryDetail")}
          disabled={!selected}
          style={tw`bg-green-500 py-3 m-3 rounded-full ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});