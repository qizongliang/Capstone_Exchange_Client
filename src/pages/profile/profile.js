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
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import mdata from '../../assets/mockItems'
import mockItems from '../../assets/mockItems'

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
  const [userHistory, setUserHistory] = useState([])
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
        setUserHistory(JSON.parse(res.data.orderhistory))
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
      <Typography variant="h2" align="center">
        ORDER HISTORY
      </Typography>
      {console.log(userHistory)}
      {userHistory.map((order, orderIndex) => {
        console.log(order.orderdate)
        console.log(order.orderitemsid)
        console.log(order.orderitemsamt)
        console.log(order.ordertotal['$numberDecimal'])

        return (
          <>
            <Typography variant="h3" align="center">
              ORDER {orderIndex + 1}
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      Details
                    </TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Desc</TableCell>
                    <TableCell align="right">Qty.</TableCell>
                    <TableCell align="right">Unit</TableCell>
                    <TableCell align="right">Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderitemsid.map((itemId, itemIndex) => (
                    <TableRow key={itemId}>
                      <TableCell>{mockItems[itemId - 1].title}</TableCell>
                      <TableCell align="right">
                        {order.orderitemsamt[itemIndex]}
                      </TableCell>
                      <TableCell align="right">
                        {mockItems[itemId - 1].price}
                      </TableCell>
                      <TableCell align="right">
                        {mockItems[itemId - 1].price *
                          order.orderitemsamt[itemIndex]}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Date</TableCell>
                    <TableCell align="right">{order.orderdate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">
                      {order.ordertotal['$numberDecimal']}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )
      })}

      <Button variant="outlined" onClick={onLogout}>
        logout
      </Button>
    </div>
  )
}
export default Profile
