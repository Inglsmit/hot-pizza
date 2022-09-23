import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categoryID: 0,
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
		}
	},
} )

export const { setCategoryID, setSort } = filtersSlice.actions

export default filtersSlice.reducer