//import { useState } from 'react'

import { Route, Routes } from "react-router-dom"
import Landing from "./pages/landing"
import Directory from "./pages/directory/directory"



function App() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/directory" element={<Directory />} />
		</Routes>

  	)
}

export default App