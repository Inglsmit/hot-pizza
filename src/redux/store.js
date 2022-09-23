import { configureStore } from '@reduxjs/toolkit'
import filter from './slice/filtersSlice'

export const store = configureStore( {
	reducer: { filter },
} )