import { createSelector } from '@reduxjs/toolkit'
import { selectCartTotal } from './cartSlice'

export const selectCartTax = createSelector([selectCartTotal], (totalAmount) => {
  const tax = totalAmount * 0.1
  return Math.round(tax * 100) / 100
})

export const selectCartSummary = createSelector(
  [(state) => state.cart.items, selectCartTotal, selectCartTax],
  (items, totalAmount, tax) => ({
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount,
    tax,
    grandTotal: Math.round((totalAmount + tax) * 100) / 100,
  }),
)
