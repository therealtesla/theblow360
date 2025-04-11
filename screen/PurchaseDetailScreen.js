import * as React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";
import MyButton from "../components/MyButton";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import tw from 'tailwind-react-native-classnames';
import { selectTravelTimeInformation, selectDestination } from '../slices/navSlice'; // Import destination selector
import { useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select'; // Import the dropdown library
import PhoneInput from 'react-native-phone-input'; // Import the phone input library

// Constants
const SURGE_CHARGE_RATE = 1.5;
const multiplier = 350;

const PurchaseDetailScreen = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [pack, setPack] = useState("");
    const [instruction, setInstruction] = useState("");
    const navigation = useNavigation();

    const travelTimeInformation = useSelector(selectTravelTimeInformation);
    const destination = useSelector(selectDestination); // Get destination from Redux
    const [selected, setSelected] = useState(null);

    // Debugging: Log destination to ensure it's being retrieved
    console.log("Destination from Redux:", destination);

    // Calculate total amount dynamically
    const totalAmount = travelTimeInformation
        ? (travelTimeInformation.duration.value * multiplier * SURGE_CHARGE_RATE) / 100
        : 0;

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text style={{
                    fontSize: 15,
                    fontWeight: '600',
                    marginTop: 80,
                    marginLeft: 115,
                    marginBottom: 20,
                }}>
                    Purchase Delivery Details
                </Text>
            </View>

            <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 10, backgroundColor: "#f5f5f5" }}>
                <View style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5
                }}>
                    <TextInput
                        style={{
                            height: 50,
                            borderColor: "#ddd",
                            borderWidth: 1,
                            marginBottom: 15,
                            padding: 15,
                            borderRadius: 10
                        }}
                        placeholder="Recipient Name"
                        value={name}
                        onChangeText={setName}
                    />

                    {/* Phone Number Input with Country Flag */}
                    <PhoneInput
                        style={{
                            height: 50,
                            borderColor: "#ddd",
                            borderWidth: 1,
                            marginBottom: 15,
                            padding: 15,
                            borderRadius: 10
                        }}
                        initialCountry="ng" // Set the default country
                        value={phoneNumber}
                        onChangePhoneNumber={(value) => setPhoneNumber(value)}
                        
                        textProps={{
                            placeholder: "Phone Number",
                            maxLength:15
                        }}
                    />

                    {/* Dropdown for Package Type */}
                    <RNPickerSelect
                        onValueChange={(value) => setPack(value)}
                        items={[
                            { label: 'Small Package', value: 'small' },
                            { label: 'Medium Package', value: 'medium' },
                            { label: 'Large Package', value: 'large' },
                        ]}
                        style={{
                            inputIOS: {
                                height: 50,
                                borderColor: "#ddd",
                                borderWidth: 1,
                                marginBottom: 15,
                                padding: 15,
                                borderRadius: 10,
                                color: 'black',
                            },
                            inputAndroid: {
                                height: 50,
                                borderColor: "#ddd",
                                borderWidth: 1,
                                marginBottom: 15,
                                padding: 15,
                                borderRadius: 10,
                                color: 'black',
                            },
                        }}
                        placeholder={{
                            label: "Select Package Type",
                            value: "",
                        }}
                        value={pack}
                        Icon={() => (
                            <View>
                                <Text style={{ color: "black", fontSize: 20, marginTop: 13, marginRight: 5 }}>▼</Text>
                            </View>
                        )}
                    />

                    {/* Destination Address */}
                    <TextInput
    style={{
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        marginBottom: 15,
        padding: 15,
        borderRadius: 10
    }}
    placeholder="Destination Address"
    value={destination?.description || "No destination set"} // Dynamically show the destination description
    editable={false} // Make it non-editable
/>

                    <TextInput
                        style={{
                            height: 150,
                            borderColor: "#ddd",
                            textAlignVertical: "top",
                            borderWidth: 1,
                            marginBottom: 15,
                            minHeight: 100,
                            padding: 15,
                            borderRadius: 10
                        }}
                        placeholder="Customer Instruction"
                        multiline
                        value={instruction}
                        onChangeText={setInstruction}
                    />
                    
                    {instruction.length > 0 && (
                        <Text style={tw`font-bold underline`}>
                            Box can fit 40cm x 40cm x 40cm up to 7kg. We do not transport anything illegal.
                        </Text>
                    )}
                    <Text style={tw`font-bold mt-3`}>Charges</Text>

                    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 10, backgroundColor: "#f5f5f5" }}>
                        <View>
                            <Text style={tw`text-center py-2`}>Distance - {travelTimeInformation?.distance.text}</Text>
                            <Text style={tw`text-center py-2`}>TravelTime - {travelTimeInformation?.duration.text}</Text>

                            <Text style={tw`text-center py-2 font-bold`}>
                                Total: {new Intl.NumberFormat('en-ng', {
                                    style: 'currency',
                                    currency: 'NGN'
                                }).format(totalAmount)}
                            </Text>
                        </View>
                    </View>

                    <View style={tw`mt-5`}>
                        <Text style={tw`font-bold mt-2`}>Responsible for Payment</Text>
                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            paddingHorizontal: 10,
                            backgroundColor: "#f5f5f5",
                            marginTop: 10
                        }}>
                            <TouchableOpacity onPress={() => { setSelected(1); }}>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <View style={{
                                        height: 20,
                                        width: 20,
                                        borderWidth: 1,
                                        borderRadius: 20,
                                        marginTop: 10
                                    }}>
                                        {selected === 1 ? (
                                            <View style={{
                                                backgroundColor: "blue",
                                                flex: 1,
                                                borderRadius: 20,
                                                margin: 3
                                            }} />
                                        ) : null}
                                    </View>
                                    <Text style={tw`mt-3 ml-2 font-bold`}>Sender (ME)</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { setSelected(2); }}>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <View style={{
                                        height: 20,
                                        width: 20,
                                        borderWidth: 1,
                                        borderRadius: 20,
                                        marginTop: 20
                                    }}>
                                        {selected === 2 ? (
                                            <View style={{
                                                backgroundColor: "blue",
                                                flex: 1,
                                                borderRadius: 20,
                                                margin: 3
                                            }} />
                                        ) : null}
                                    </View>
                                    <Text style={tw`mt-4 ml-2 font-bold`}>Receiver</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={tw`py-2 justify-evenly`}>
                        <MyButton label='Reset' borderColor="gray" onPress={() => navigation.navigate("Main")} />
                        <MyButton label='Submit' backgroundColor="green" onPress={() => navigation.navigate("PurchasePayment")} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default PurchaseDetailScreen;