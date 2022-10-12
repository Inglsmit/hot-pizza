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

// import { SearchContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas } from '../redux/slice/pizzasSlice';

export const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = React.useRef( false );
	const isMounted = React.useRef( false );

	const { categoryID, sort, currentPage, searchValue } = useSelector( ( state ) => state.filter );
	const { items: pizzas, status: statusLoading } = useSelector( ( state ) => state.pizzas );

	// const [ pizzas, setPizzas ] = React.useState( [] );
	// const [ isLoading, setIsLoading ] = React.useState( true );

	const onClickCategory = ( id ) => {
		dispatch( setCategoryID( id ) )
	}

	const onChangePage = ( number ) => {
		dispatch( setCurrentPage( number ) );
	}

	const getPizzas = async () => {
		// setIsLoading( true );

		const sortBy = sort.sortProperty;
		const category = categoryID > 0 ? `category=${ categoryID }` : '';
		const search = searchValue ? `&search=${ searchValue }` : '';

		dispatch( fetchPizzas( {
			sortBy,
			category,
			search,
			currentPage
		} ) );
		// catch error removed because of now erro in extraRedusers

		window.scrollTo( 0, 0 );
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
			getPizzas();
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
				{ statusLoading === 'error' ? (
					<>
						<h2>Some error happend <icon>😕</icon></h2>
						<p>
							Check your internet connection.
						</p>
					</>
				) : (
					<>
						<div className="content__items">
							{ statusLoading === 'loading'
								? [ ...new Array( 6 ) ].map( ( _, i ) => <Sceleton key={ i } /> )
								: pizzas.map( ( pizza, i ) => (
									<PizzaBlock key={ i } { ...pizza } />
								) )
							}
						</div>

						<Pagination currentPage={ currentPage } onChangePage={ onChangePage } />
					</>
				) }

			</div>
		</>
	)
}
