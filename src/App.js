import React from 'react'
import './App.css'
import PrimarySearchAppBar from './components/navbar'
import Home from './pages/home/home'
import User from './pages/user/user'
import Shoppingcart from './pages/shoppingcart/shoppingcart'
import Footer from './components/footer/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Profile from './pages/profile/profile'
import RegisterUser from './pages/user/register/registerUser'

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <PrimarySearchAppBar />

          <Routes>
            <Route path="/" Component={Home} />

            <Route path="/user" Component={User} />
            <Route path="/registeruser" Component={RegisterUser} />
            <Route path="/profile" Component={Profile} />

            <Route path="/shoppingcart" Component={Shoppingcart} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
      <Footer />
    </>
  )
}

export default App
