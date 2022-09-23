import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryID } from '../redux/slice/filtersSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import { SearchContext } from '../App';

export const Home = () => {
	const dispatch = useDispatch();

	const { categoryID, sort } = useSelector( ( state ) => state.filter );


	const { searchValue } = React.useContext( SearchContext );
	const [ pizzas, setPizzas ] = React.useState( [] );
	const [ isLoading, setIsLoading ] = React.useState( true );


	const onClickCategory = ( id ) => {
		dispatch( setCategoryID( id ) )
	}

	React.useEffect( () => {
		setIsLoading( true );
		fetch( `https://63232eaf362b0d4e7dde21f1.mockapi.io/items?${ categoryID > 0 ? `category=${ categoryID }` : ``
			}&sortBy=${ sort.sortProperty }&order=desc&search=${ searchValue }` )
			.then( ( res ) => res.json() )
			.then( ( arr ) => {
				setPizzas( arr );
				setIsLoading( false );
			} );

		window.scrollTo( 0, 0 );
	}, [ categoryID, sort.sortProperty, searchValue ] );

	return (
		<>
			<div className="container">
				<div className="content__top">
					<Categories value={ categoryID } onClickCategory={ onClickCategory } />
					<Sort />
				</div>
				<h2 className="content__title">All pizzas</h2>
				<div className="content__items">
					{ isLoading
						? [ ...new Array( 6 ) ].map( ( _, i ) => <Sceleton key={ i } /> )
						: pizzas.map( ( pizza, i ) => (
							<PizzaBlock key={ i } { ...pizza } />
						) )
					}
				</div>
			</div>
		</>
	)
}
