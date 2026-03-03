//import { useState } from 'react'

import { Route, Routes } from "react-router-dom"
import Profile from "./pages/profile/profile"
import AddFood from "./pages/add-food"
import Favorites from "./pages/favorites"
import Landing from "./pages/landing"
import Directory from "./pages/directory/directory"



function App() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/directory" element={<Directory />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/add-food" element={<AddFood />} />
			<Route path="/favorites" element={<Favorites />} />
		</Routes>

  	)
}

export default App