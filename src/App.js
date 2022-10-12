import React from 'react';

import Header from './components/Header';
import { Home } from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart';

import './assets/scss/app.scss';

function App () {
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<Routes>
					<Route path='/hot-pizza/' element={ <Home /> } />
					<Route path='/hot-pizza/cart/' element={ <Cart /> } />
					<Route path='*' element={ <NotFound /> } />
				</Routes>
			</div>
		</div>
	);
}

export default App;
