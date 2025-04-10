import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { useSelector } from 'react-redux';
import { selectBasketTotal } from '../features/basketSlice';
import { selectDeliveryFee } from '../features/deliveryFeeSlice';
import { useNavigation } from "@react-navigation/native";



// Constants


const FoodPaymentScreen = () => {
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'card'
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  // Fetch data from Redux slices
  const basketTotal = useSelector(selectBasketTotal); // Total cost of items in the basket
  const deliveryFee = useSelector(selectDeliveryFee); // Delivery fee

  // Calculate total amount dynamically
  const totalAmount = (basketTotal + deliveryFee)

  const handlePayment = () => {
    if (paymentMethod === 'card') {
      if (!cardNumber || !expiryDate || !cvv || !cardHolderName) {
        Alert.alert('Error', 'Please fill in all card details.');
        return;
      }
      Alert.alert('Success', 'Card payment processed successfully!');
    } else {
      Alert.alert('Success', 'Cash payment selected!');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`p-5`}>
        {/* Total Amount Section */}
        <View style={styles.totalAmountContainer}>
          <Text style={styles.totalAmountText}>Total Amount</Text>
          <Text style={styles.totalAmountValue}>
            {new Intl.NumberFormat('en-ng', {
              style: 'currency',
              currency: 'NGN',
            }).format(totalAmount)}
          </Text>
        </View>

        <Text style={tw`text-lg font-bold mb-5`}>Select Payment Method</Text>

        {/* Payment Method Selection */}
        <View style={tw`flex-row justify-around mb-5`}>
          <TouchableOpacity
            style={[
              styles.methodButton,
              paymentMethod === 'cash' && styles.activeMethodButton,
            ]}
            onPress={() => setPaymentMethod('cash')}
          >
            <Text style={paymentMethod === 'cash' ? styles.activeText : styles.inactiveText}>
              Cash
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.methodButton,
              paymentMethod === 'card' && styles.activeMethodButton,
            ]}
            onPress={() => setPaymentMethod('card')}
          >
            <Text style={paymentMethod === 'card' ? styles.activeText : styles.inactiveText}>
              Card
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card Payment Fields */}
        {paymentMethod === 'card' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Card Holder Name"
              value={cardHolderName}
              onChangeText={setCardHolderName}
            />
            <TextInput
              style={styles.input}
              placeholder="Expiry Date (MM/YY)"
              keyboardType="numeric"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
            <TextInput
              style={styles.input}
              placeholder="CVV"
              keyboardType="numeric"
              secureTextEntry
              value={cvv}
              onChangeText={setCvv}
            />
          </>
        )}

        {/* Payment Button */}
        <TouchableOpacity style={styles.button}
        
        onPress={() => navigation.navigate("PreparingOrder")}>
          <Text style={tw`text-white font-bold`}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FoodPaymentScreen;

const styles = StyleSheet.create({
  totalAmountContainer: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6C757D',
  },
  totalAmountValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    marginTop: 5,
  },
  methodButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
    width: '40%',
    alignItems: 'center',
  },
  activeMethodButton: {
    backgroundColor: '#007BFF',
  },
  activeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#007BFF',
  },
  input: {
    backgroundColor: '#E5E4E2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});