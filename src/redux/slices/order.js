import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: null,
    page: 1,
    totalPages: 1,
    totalOrders: 0,
    limit: 10,
    loading: false,
    error: null,
  },
  reducers: {
    setAllOrders(state, action) {
      state.orders = action.payload.orders;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
      state.totalOrders = action.payload.totalOrders;
      state.limit = action.payload.limit;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setAllOrders, setLoading, setError } = orderSlice.actions;

export default orderSlice.reducer;
