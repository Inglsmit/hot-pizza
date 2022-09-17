import './assets/scss/app.scss';
import Header from './components/Header';

import React from 'react';
import { Home } from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart';

// import pizzas from './assets/pizzas.json';

function App () {


	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<Routes>
						<Route path='/' element={ <Home /> } />
						<Route path='/cart' element={ <Cart /> } />
						<Route path='*' element={ <NotFound /> } />
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
