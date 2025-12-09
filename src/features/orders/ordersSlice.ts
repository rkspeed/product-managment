import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from './../../api/apiClient'
import type { Order } from "./data/schema";

interface OrdersState {
  data: Order[]
  loading: boolean
  error: string | null
}

const initialState: OrdersState = {
  data: [],
  loading: false,
  error: null,
}

export const fetchOrders = createAsyncThunk('orders/fetch', async () => {
  const res = await api.get<Order[]>('/orders')
  return res.data
})

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch orders'
      })
  },
})

export default ordersSlice.reducer
