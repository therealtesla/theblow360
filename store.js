import {configureStore} from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";
import basketReducer from "./features/basketSlice"
import restaurantReducer from "./features/restaurantSlice"
import deliveryFeeReducer from "./features/deliveryFeeSlice"; 
import trackingReducer from "./slices/trackingSlice"; // Import the tracking reducer


export const store = configureStore({
    reducer:{
      nav:navReducer,
      basket:basketReducer,
      restaurant:restaurantReducer,
      deliveryFee: deliveryFeeReducer, // Add the delivery fee reducer
      tracking: trackingReducer,

   

    },
});