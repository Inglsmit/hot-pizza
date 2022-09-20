import React from 'react'
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';

export const Home = () => {
	const [ pizzas, setPizzas ] = React.useState( [] );
	const [ isLoading, setIsLoading ] = React.useState( true );
	const [ categoryID, setCategoryID ] = React.useState( 0 );
	const [ sortType, setSortType ] = React.useState( {
		name: 'popular', sortProperty: 'rating'
	} );

	React.useEffect( () => {
		setIsLoading( true );
		fetch( `https://63232eaf362b0d4e7dde21f1.mockapi.io/items?${ categoryID > 0 ? `category=${ categoryID }` : ``
			}&sortBy=${ sortType.sortProperty }&order=desc` )
			.then( ( res ) => res.json() )
			.then( ( arr ) => {
				setPizzas( arr );
				setIsLoading( false );
			} );

		window.scrollTo( 0, 0 );
	}, [ categoryID, sortType ] );

	return (
		<>
			<div className="container">
				<div className="content__top">
					<Categories value={ categoryID } onClickCategory={ ( i ) => setCategoryID( i ) } />
					<Sort value={ sortType } onClickSort={ ( i ) => setSortType( i ) } />
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
