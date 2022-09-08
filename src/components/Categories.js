import React, { useState } from 'react';

function Categories () {
	const [ activeIndex, setActiveIndex ] = useState( 0 );

	const categories = [ 'All', 'Meat', 'Vegan', 'Grill', 'Sharp', 'Closed' ]

	return (
		<div className="categories">
			<ul>
				{
					categories.map( ( catName, i ) => (
						<li onClick={ () => setActiveIndex( i ) } className={ activeIndex === i ? 'active' : '' }>{ catName }</li>
					) )
				}
			</ul>
		</div >
	)
}

export default Categories;