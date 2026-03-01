//import { useState } from 'react'

import { Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Directory from "./pages/Directory"
import Profile from "./pages/Profile"
import AddFood from "./pages/Add-Food"
import Favorites from "./pages/Favorites"


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