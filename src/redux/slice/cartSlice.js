import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	totalPrice: 0,
	items: []
}

export const cartSlice = createSlice( {
	name: 'cart',
	initialState,
	reducers: {
		addItem ( state, action ) {
			// state.items.push( action.payload );
			const theSameItem = state.items.find( ( obj ) => obj.id === action.payload.id );
			if ( theSameItem ) {
				theSameItem.count++;
			} else {
				state.items.push( {
					...action.payload,
					count: 1,
				} );
			}

			state.totalPrice = state.items.reduce( ( sum, obj ) => {
				return ( obj.price * obj.count ) + sum;
			}, 0 );
		},
		removeItem ( state, action ) {
			state.items = state.items.filter( ( obj ) => obj.id === action.payload.id );
		},
		minusItem ( state, action ) {
			const theSameItem = state.items.find( ( obj ) => obj.id === action.payload.id );
			if ( theSameItem ) {
				if ( theSameItem.count > 0 ) theSameItem.count--;
			}
		},
		clearItems ( state ) {
			state.items = [];
			state.totalPrice = 0;
		}

	},
} )

export const selectCart = ( state ) => state.cart;
export const selectCartItemByID = ( id ) => ( state ) => state.cart.items.find( ( obj ) => obj.id === id );

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer