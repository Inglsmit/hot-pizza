import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	searchValue: '',
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
		setSearchValue ( state, action ) {
			state.searchValue = action.payload;
		},
		setSort ( state, action ) {
			state.sort = action.payload;
		},
		setCurrentPage ( state, action ) {
			state.currentPage = action.payload;
		},
		setFilters ( state, action ) {
			state.categoryID = action.payload.categoryID;
			state.sort = action.payload.sort;
			state.currentPage = action.payload.currentPage;
		}
	},
} )

export const { setCategoryID, setSort, setCurrentPage, setFilters, setSearchValue } = filtersSlice.actions

export default filtersSlice.reducer