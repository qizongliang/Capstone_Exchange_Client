import React from 'react'
import './App.css'
import PrimarySearchAppBar from './components/navbar'
import Home from './pages/home/home'
import User from './pages/user/user'
import Shoppingcart from './pages/shoppingcart/shoppingcart'
<<<<<<< HEAD
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
=======
import Footer from './components/footer/Footer'
>>>>>>> e6179c280a99cb954fb55f92cf95e838b351d6d7
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <PrimarySearchAppBar />

<<<<<<< HEAD
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/user" Component={User} />
            <Route path="/shoppingcart" Component={Shoppingcart} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
=======
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/user" Component={User} />
          <Route path="/shoppingcart" Component={Shoppingcart} />
        </Routes>
      </div>
      <Footer/>
    </Router>
>>>>>>> e6179c280a99cb954fb55f92cf95e838b351d6d7
  )
}
// const Home = () => (
//   <div>
//     <h1>Home Page</h1>
//   </div>
// )

export default App
