import React, { useState } from 'react'
import './App.css'
import PrimarySearchAppBar from './components/navbar'
import Home from './pages/home/home'
import User from './pages/user/user'
import Shoppingcart from './pages/shoppingcart/shoppingcart'
import Footer from './components/footer/Footer'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Profile from './pages/profile/profile'
import RegisterUser from './pages/user/register/registerUser'

// import mdata from "./assets/mockItems"
import axios from 'axios'

function App() {
  const [shopItems, setShopItems] = useState([])
  const [CartItem, setCartItem] = useState([])

  const fetchMe = async () => {
    const res = await axios
      .get('/api/items')
      .then((res) => {
        console.log(res.data)
        setShopItems(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchMe()
  }, [])

  const addToCar = (product, qty) => {
    const productExit = CartItem.find((item) => item.id === product.id)
    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty + 1 }
            : item,
        ),
      )
    } else {
      //change later
      setCartItem([...CartItem, { ...product, qty: qty }])
    }
  }

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {
      setCartItem(
        CartItem.map((item) =>
          item.id === product.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item,
        ),
      )
    }
  }

  const deleteItem = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)
    if (productExit) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    }
  }

  const deleteAll = () => {
    setCartItem([])
  }

  return (
    <>
      <Router>
        <div className="App">
          <PrimarySearchAppBar CartItem={CartItem} />

          <Routes>
            <Route
              path="/"
              element={<Home shopItems={shopItems} addToCar={addToCar} />}
            />

            <Route path="/user" element={<User />} />
            <Route path="/registeruser" element={<RegisterUser />} />
            <Route path="/profile" element={<Profile />} />

            <Route
              path="/shoppingcart"
              element={
                <Shoppingcart
                  addToCar={addToCar}
                  CartItem={CartItem}
                  decreaseQty={decreaseQty}
                  deleteItem={deleteItem}
                  deleteAll={deleteAll}
                />
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
      <Footer />
    </>
  )
}

export default App
