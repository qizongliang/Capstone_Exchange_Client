import React from 'react'
import { Link } from 'react-router-dom'
import shopcarticon from '../assets/shopping-cart-line.png'
import usericon from '../assets/user-line.png'
import arrow from '../assets/arrow-right-fill.png'
import './navbar.css'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'

function navbar() {
  const navStyle = {
    color: 'white',
    textDecoration: 'none',
  }

  return (
    <nav>
      <Link id="logo" style={navStyle} to="/">
        <h3>Exchange</h3>
      </Link>

      <input id="searchbar" type="search" placeholder="Search For Item" />

      <Link id="searcharrow" to="/">
        <img src={arrow} alt="" />
      </Link>

      <Link id="profile" style={navStyle} to="/user">
        <img src={usericon} alt="user" />
      </Link>
      <Link id="cart" style={navStyle} to="/shoppingcart">
        <img src={shopcarticon} alt="cart" />
      </Link>
    </nav>
  )
}
export default navbar
