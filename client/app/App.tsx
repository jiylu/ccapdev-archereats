//import { useState } from 'react'

import { Route, Routes } from "react-router-dom"
import Profile from "./pages/profile/profile"
import AddFood from "./pages/add-food/add-food"
import Favorites from "./pages/favorites"
import Landing from "./pages/landing"
import Directory from "./pages/directory/directory"
import Signup from "./pages/signup/signup"
import EditProfile from "./pages/edit-profile"
import { Toaster } from "./components/ui/sonner"


function App() {
	return (
		<>
			<Toaster />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/directory" element={<Directory />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/add-food" element={<AddFood />} />
				<Route path="/favorites" element={<Favorites />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/edit-profile" element={<EditProfile />} />
			</Routes>
		</>



  	)
}

export default App