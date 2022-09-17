import './assets/scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import Sceleton from './components/PizzaBlock/Sceleton';
import React from 'react';

// import pizzas from './assets/pizzas.json';

function App () {
	const [ pizzas, setPizzas ] = React.useState( [] );
	const [ isLoading, setIsLoading ] = React.useState( true );

	React.useEffect( () => {
		fetch( 'https://63232eaf362b0d4e7dde21f1.mockapi.io/items' )
			.then( ( res ) => res.json() )
			.then( ( arr ) => {
				setPizzas( arr );
				setIsLoading( false );
			} );
	}, [] );

	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<div className="content__top">
						<Categories />
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
			</div>
		</div>
	);
}

export default App;
