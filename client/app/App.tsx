//import { useState } from 'react'

import { Route, Routes } from "react-router-dom"
import Profile from "./pages/profile/profile"
import AddFood from "./pages/add-food/add-food"
import Landing from "./pages/landing"
import Directory from "./pages/directory/directory"
import ReviewPage from "./pages/review-page/review-page"
import Signup from "./pages/signup/signup"
import EditProfile from "./pages/edit-profile"
import OwnedRestaurants from "./pages/owned-restaurants/owned-restau"
import { Toaster } from "./components/ui/sonner"
import { PublicRoute } from "./components/routes/public-route"


function App() {
	return (
		<>
			<Toaster />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/directory" element={<Directory />} />
				<Route path="/reviews/:id" element={<ReviewPage />} />
				<Route path="/profile/:username" element={<Profile />} />
				<Route path="/add-food" element={<AddFood />} />
				<Route path="/manage-restaurant/:id" element={<AddFood />} />
				<Route path="/owned-restau" element={<OwnedRestaurants />} />
				<Route 
					path="/signup" 
					element={
						<PublicRoute>
							<Signup />
						</PublicRoute>
					} />
				<Route path="/edit-profile" element={<EditProfile />} />
			</Routes>
		</>



  	)
}

export default App