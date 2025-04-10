import {configureStore} from "@reduxjs/toolkit";
import navReducer from "./slices/navSlice";
import basketReducer from "./features/basketSlice"
import restaurantReducer from "./features/restaurantSlice"


export const store = configureStore({
    reducer:{
      nav:navReducer,
      basket:basketReducer,
      restaurant:restaurantReducer

   

    },
});