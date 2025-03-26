import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './styles/global.scss'
import Home from './view/pages/Home.jsx'
import NotFound from './view/pages/NotFound.jsx'
import ThemeToggle from './view/components/ThemeToggle.jsx'
import {getInitialTheme, setTheme} from './controllers/themeController.js'


function App() {
useEffect(() => {setTheme(getInitialTheme())}, []);


  return (
    <Router basename="/">
      {/* <Navbar /> */}
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  )
}

export default App
