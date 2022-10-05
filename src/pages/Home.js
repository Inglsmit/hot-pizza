import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryID, setCurrentPage, setFilters } from '../redux/slice/filtersSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import { Pagination } from '../components/Pagination';

import { SearchContext } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setPizzas } from '../redux/slice/pizzasSlice';

export const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = React.useRef( false );
	const isMounted = React.useRef( false );

	const { categoryID, sort, currentPage } = useSelector( ( state ) => state.filter );
	const pizzas = useSelector( ( state ) => state.pizzas.items );

	console.log( pizzas );

	const { searchValue } = React.useContext( SearchContext );
	// const [ pizzas, setPizzas ] = React.useState( [] );
	const [ isLoading, setIsLoading ] = React.useState( true );


	const onClickCategory = ( id ) => {
		dispatch( setCategoryID( id ) )
	}

	const onChangePage = ( number ) => {
		dispatch( setCurrentPage( number ) );
	}

	const fetchPizzas = async () => {
		setIsLoading( true );

		try {
			const res = await axios.get(
				`https://63232eaf362b0d4e7dde21f1.mockapi.io/items?page=${ currentPage }&limit=4&${ categoryID > 0 ? `category=${ categoryID }` : ``
				}&sortBy=${ sort.sortProperty }&order=desc&search=${ searchValue }`
			);
			dispatch( setPizzas( res.data ) );
		} catch ( error ) {
			console.log( 'ERROR', error )
			alert( 'Issue with getting pizzas' );
		} finally {
			setIsLoading( false );
		}

	}

	React.useEffect( () => {
		// qs2: check if first render was happened AND params was updated
		// we need to check it because of useEffect happend at list one time with first render
		if ( isMounted.current ) {
			const querySelector = qs.stringify( {
				sortProperty: sort.sortProperty,
				categoryID,
				currentPage
			} )

			navigate( `?${ querySelector }` );
		}
		isMounted.current = true; // first render happened
	}, [ categoryID, sort.sortProperty, searchValue, currentPage ] )

	// qs1: if we got params from url -> we will be save this params in reducer filter
	React.useEffect( () => {
		if ( window.location.search ) {
			const params = qs.parse( window.location.search.substring( 1 ) );

			const sort = sortList.find( obj => obj.sortProperty === params.sortProperty );

			// pass params from url to REDUX
			dispatch(
				setFilters( {
					...params,
					sort,
				} )
			)
			isSearch.current = true; // qs: if we got params from URL then 
		}
	}, [] );

	// qs: if first render happened then fetch pizzas
	React.useEffect( () => {
		window.scrollTo( 0, 0 );
		if ( !isSearch.current ) { // qs: if we have got params from URL we no need to do this fetch
			fetchPizzas();
		}
		isSearch.current = false;

	}, [ categoryID, sort.sortProperty, searchValue, currentPage ] )

	return (
		<>
			<div className="container">
				<div className="content__top">
					<Categories value={ categoryID } onClickCategory={ onClickCategory } />
					<Sort value={ sort } />
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
