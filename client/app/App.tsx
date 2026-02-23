//import { useState } from 'react'

import { Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Directory from "./pages/Directory"



function App() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/directory" element={<Directory />} />
		</Routes>

  	)
}

export default App