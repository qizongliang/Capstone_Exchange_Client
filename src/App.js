import React from 'react'
import './App.css'
import PrimarySearchAppBar from './components/navbar'
import Home from './pages/home/home'
import User from './pages/user/user'
import Shoppingcart from './pages/shoppingcart/shoppingcart'
import Footer from './components/footer/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <PrimarySearchAppBar />

        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/user" Component={User} />
          <Route path="/shoppingcart" Component={Shoppingcart} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  )
}
// const Home = () => (
//   <div>
//     <h1>Home Page</h1>
//   </div>
// )

export default App
