import React from 'react';

function Categories ( { value, onClickCategory } ) {
	const categories = [ 'All', 'Meat', 'Vegan', 'Grill', 'Sharp', 'Closed' ]

	return (
		<div className="categories">
			<ul>
				{
					categories.map( ( catName, i ) => (
						<li
							key={ i }
							onClick={ () => onClickCategory( i ) }
							className={ value === i ? 'active' : '' }
						>
							{ catName }
						</li>
					) )
				}
			</ul>
		</div >
	)
}

export default Categories;