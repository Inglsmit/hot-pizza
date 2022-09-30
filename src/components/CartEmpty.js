import React from 'react';
import { Link } from 'react-router-dom';
import imgEmpty from '../assets/img/empty-cart.png'

export const CartEmpty = () => {
	return (
		<>
			<div className="cart cart--empty">
				<h2>Cart empty <icon>😕</icon></h2>
				<p>
					Most likely, you haven't ordered pizza yet.<br />
					To order a pizza, go to the main page.
				</p>
				<img src={ imgEmpty } alt="Empty cart" />
				<Link to="/" className="button button--black">
					<span>Home</span>
				</Link>
			</div>
		</>
	)
}
