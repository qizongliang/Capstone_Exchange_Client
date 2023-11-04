import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userSelector, useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../../redux/slice/authSlice'
import Button from '@mui/material/Button'
import axios from 'axios'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useState, useEffect } from 'react'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

function Profile() {
  const [userData, setUserData] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  const fetchMe = async () => {
    var jwtToken = JSON.parse(sessionStorage.getItem('user')).token
    const res = await axios
      .get('/api/userAccount/me', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        console.log(res.data)
        setUserData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchMe()
  }, [])
  return (
    <div>
      <Typography variant="h2" align="center">
        PROFILE
      </Typography>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={4}>
          <Item>
            First Name:
            <Typography variant="h4" color="#1565c0">
              {userData.firstname}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            Last Name:
            <Typography variant="h4" color="#1565c0">
              {userData.lastname}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            Email:
            <Typography variant="h4" color="#1565c0">
              {userData.email}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            Address:
            <Typography variant="h4" color="#1565c0">
              {userData.address}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            Phone Number:
            <Typography variant="h4" color="#1565c0">
              {userData.phonenumber}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            Balance:
            <Typography variant="h4" color="#1565c0">
              {userData.balance}
            </Typography>
          </Item>
        </Grid>
      </Grid>
      <Button variant="outlined" onClick={onLogout}>
        logout
      </Button>
    </div>
  )
}
export default Profile
