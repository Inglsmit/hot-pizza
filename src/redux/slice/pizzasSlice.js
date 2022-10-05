import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// const fetchPizzas = createAsyncThunk(
// 	'pizzas/fetchPizzasByIdStatus',
// 	async () => {
// 		const response = await userAPI.fetchById( userId )
// 		return response.data
// 	}
// )

const initialState = {
	items: []
}

export const pizzasSlice = createSlice( {
	name: 'pizzas',
	initialState,
	reducers: {
		setPizzas ( state, action ) {
			state.items = action.payload;
		},
	},
} )

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer