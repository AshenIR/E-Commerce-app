import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './Components/Dashboard';


const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routing