import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryID, setCurrentPage } from '../redux/slice/filtersSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import { Pagination } from '../components/Pagination';

import { SearchContext } from '../App';
import axios from 'axios';

export const Home = () => {
	const dispatch = useDispatch();

	const { categoryID, sort, currentPage } = useSelector( ( state ) => state.filter );


	const { searchValue } = React.useContext( SearchContext );
	const [ pizzas, setPizzas ] = React.useState( [] );
	const [ isLoading, setIsLoading ] = React.useState( true );


	const onClickCategory = ( id ) => {
		dispatch( setCategoryID( id ) )
	}

	const onChangePage = ( number ) => {
		dispatch( setCurrentPage( number ) );
	}

	React.useEffect( () => {
		setIsLoading( true );

		axios.get(
			`https://63232eaf362b0d4e7dde21f1.mockapi.io/items?${ currentPage }&limit=4&${ categoryID > 0 ? `category=${ categoryID }` : ``
			}&sortBy=${ sort.sortProperty }&order=desc&search=${ searchValue }`
		).then( ( res ) => {
			setPizzas( res.data );
			setIsLoading( false );
		} )

		window.scrollTo( 0, 0 );
	}, [ categoryID, sort.sortProperty, searchValue, currentPage ] );

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
				<Pagination currentPage={ currentPage } onChangePage={ onChangePage } />
			</div>
		</>
	)
}
