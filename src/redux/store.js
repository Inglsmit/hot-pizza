import { configureStore } from '@reduxjs/toolkit'
import filter from './slice/filtersSlice'
import cart from './slice/cartSlice'

export const store = configureStore( {
	reducer: {
		filter,
		cart
	},

} )