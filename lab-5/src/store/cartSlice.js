import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const incomingItem = action.payload
      const existingItem = state.items.find((item) => item.id === incomingItem.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...incomingItem, quantity: 1 })
      }

      state.totalAmount += incomingItem.price
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      const existingItem = state.items.find((item) => item.id === itemId)
      if (!existingItem) return

      existingItem.quantity -= 1
      state.totalAmount -= existingItem.price

      if (existingItem.quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== itemId)
      }
    },
    clearCart: () => ({
      items: [],
      totalAmount: 0,
    }),
  },
})

export const { addItem, removeItem, clearCart } = cartSlice.actions

export const selectCartItems = (state) => state.cart.items
export const selectCartTotal = (state) => state.cart.totalAmount

export default cartSlice.reducer
