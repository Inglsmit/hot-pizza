import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categoryID: 0,
	currentPage: 1,
	sort: {
		name: 'popular',
		sortProperty: 'rating'
	}
}

export const filtersSlice = createSlice( {
	name: 'filters',
	initialState,
	reducers: {
		setCategoryID ( state, action ) {
			state.categoryID = action.payload;
		},
		setSort ( state, action ) {
			state.sort = action.payload;
		},
		setCurrentPage ( state, action ) {
			state.currentPage = action.payload;
		}
	},
} )

export const { setCategoryID, setSort, setCurrentPage } = filtersSlice.actions

export default filtersSlice.reducer