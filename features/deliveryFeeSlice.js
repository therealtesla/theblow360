import { createSlice } from '@reduxjs/toolkit';

const deliveryFeeSlice = createSlice({
  name: 'deliveryFee',
  initialState: {
    fee: 0,
  },
  reducers: {
    setDeliveryFee: (state, action) => {
      state.fee = action.payload;
    },
  },
});

export const { setDeliveryFee } = deliveryFeeSlice.actions;

export const selectDeliveryFee = (state) => state.deliveryFee.fee;

export default deliveryFeeSlice.reducer;