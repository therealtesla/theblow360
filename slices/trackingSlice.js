import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  origin: null,
  destination: null,
};

const trackingSlice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    resetTracking: (state) => {
      state.origin = null;
      state.destination = null;
    },
  },
});

export const { setOrigin, setDestination, resetTracking } = trackingSlice.actions;

export default trackingSlice.reducer;