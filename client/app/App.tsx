//import { useState } from 'react'
import RestaurantCard from "./components/RestaurantCard"



function App() {
	return (
		<>
			<RestaurantCard
				url="https://static.where-e.com/Philippines/Metro_Manila/Malate/The-Barn_d37b8917af87015c57f0fe6e360d1b9d.jpg"
				resName="Barn"
				ratings={4.6}
				tags= {["hello", "hi"]}
			/>
    	</>
  	)
}

export default App