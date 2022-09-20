import React from "react"
import ContentLoader from "react-content-loader"

const Sceleton = ( props ) => (
	<>
		<div className="pizza-block__wrapper">
			<ContentLoader
				className="pizza-block"
				speed={ 2 }
				width={ 280 }
				height={ 465 }
				viewBox="0 0 280 465"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
				{ ...props }
			>
				<circle cx="141" cy="125" r="125" />
				<rect x="0" y="424" rx="10" ry="10" width="96" height="27" />
				<rect x="171" y="416" rx="25" ry="25" width="108" height="45" />
				<rect x="0" y="266" rx="10" ry="10" width="280" height="27" />
				<rect x="0" y="310" rx="10" ry="10" width="280" height="88" />
			</ContentLoader>
		</div>
	</>
)

export default Sceleton

