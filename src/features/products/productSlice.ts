import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import api from './../../api/apiClient'
import type { Product } from './data/schema'

interface ProductsState {
    data: Product[]
    loading: boolean
    error: string | null
    current?: Product
}

const initialState: ProductsState = {
    data: [],
    loading: false,
    error: null
}

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await api.get<Product[]>('/products')
    return res.data
})

export const fetchProductById = createAsyncThunk(
    'products/fetchById',
    async (id: string) => {
        const res = await api.get(`/products/${id}`)
        return res.data
    }
)
export const updateProduct = createAsyncThunk(
    'products/update',
    async (product: Product) => {
        const res = await api.patch(`/products/${product.id}`, product)
        return res.data
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch products'
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false
                state.current = action.payload
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch product'
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.data.findIndex(p => p.id === action.payload.id)
                if (index !== -1) state.data[index] = action.payload
                if (state.current?.id === action.payload.id) state.current = action.payload
            })
    }
})

export default productsSlice.reducer
