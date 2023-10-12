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

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <PrimarySearchAppBar />

          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/user" Component={User} />
            <Route path="/shoppingcart" Component={Shoppingcart} />
            <Route path="/profile" Component={Profile}></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
      <Footer/>
    </>
  )
}
// const Home = () => (
//   <div>
//     <h1>Home Page</h1>
//   </div>
// )

export default App
