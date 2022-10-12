import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


// Creat asyn action
export const fetchPizzas = createAsyncThunk(
	'pizzas/fetchPizzasStatus',
	async ( params ) => {
		const { sortBy, category, search, currentPage } = params;
		//make fetch  
		const res = await axios.get(
			`https://63232eaf362b0d4e7dde21f1.mockapi.io/items?page=${ 
				currentPage
			}&limit=4&${ 
				category
			}&sortBy=${ 
				sortBy 
			}&order=desc${ search }`
		);

		return res.data
	}
)

const initialState = {
	items: [],
	status: '' // loading | success | error
}

export const pizzasSlice = createSlice( {
	name: 'pizzas',
	initialState,
	reducers: {
		setPizzas ( state, action ) {
			state.items = action.payload;
		},
	},
	// pass Thunk in to extra reduser. 
	extraReducers: {
		[ fetchPizzas.pending ]: ( state ) => {
			state.status = 'loading';
			state.items = [];
		},
		[ fetchPizzas.fulfilled ]: ( state, action ) => {
			state.items = action.payload;
			state.status = 'succes';
		},
		[ fetchPizzas.rejected ]: ( state, action ) => {
			state.status = 'error';
			state.items = [];
		}
	},
} )

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer