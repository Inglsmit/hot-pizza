import { configureStore } from '@reduxjs/toolkit'
import filter from './slice/filtersSlice'
import cart from './slice/cartSlice'
import pizzas from './slice/pizzasSlice'

export const store = configureStore( {
	reducer: {
		filter,
		cart,
		pizzas
	},

} )