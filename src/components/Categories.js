import React from 'react';

function Categories () {
	const [ activeIndex, setActiveIndex ] = React.useState( 0 );

	const categories = [ 'All', 'Meat', 'Vegan', 'Grill', 'Sharp', 'Closed' ]

	return (
		<div className="categories">
			<ul>
				{
					categories.map( ( catName, i ) => (
						<li
							key={ i }
							onClick={ () => setActiveIndex( i ) }
							className={ activeIndex === i ? 'active' : '' }
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