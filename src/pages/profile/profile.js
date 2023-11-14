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

import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const addItemsToBackend = async(itemsData)=>{
  const response = await axios.post('/api/items/add', itemsData)  
  console.log(response);
}


function Profile({shopItems}) {
  const [userData, setUserData] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.auth)
  const [userBuyHistory, setUserBuyHistory] = useState([])

  const [userSellHistory, setUserSellHistory] = useState([])
  const [historySwitch, setHistorySwitch] = useState(true)
  
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal);
  }

  const addItems=(event)=>{
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    let int_id = 1+parseInt(shopItems[shopItems.length-1].id);

    const itemsData = {
      id: int_id.toString(),
      title: data.get('title'),
      price: data.get('price'),
      img: data.get('img'),
      selleremail: userData.email,
    }
    // console.log(itemsData);
    addItemsToBackend(itemsData);
    toggleModal();
  }


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
  const fetchBuyHistory = async () => {
    var jwtToken = JSON.parse(sessionStorage.getItem('user')).token

    const res = await axios
      .get('/api/orderHistory/getAllBuyOrder', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        console.log(res.data)
        setUserBuyHistory(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    console.log(res)
  }
  const fetchSellHistory = async () => {
    var jwtToken = JSON.parse(sessionStorage.getItem('user')).token

    const res = await axios
      .get('/api/sellHistory/getAllSellOrder', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        console.log(res.data)
        setUserSellHistory(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    console.log(res)
  }

  useEffect(() => {
    fetchMe()
    fetchBuyHistory()
    fetchSellHistory()
    setHistorySwitch(true)
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
      <Grid container spacing={2} marginBottom={2} justifyContent="center">
        <Grid item xs={0}>
          <Button variant="contained" onClick={() => setHistorySwitch(true)}>
            Buy Order
          </Button>
        </Grid>
        <Grid item xs={0}>
          <Button variant="contained" onClick={() => setHistorySwitch(false)}>
            Sell Order
          </Button>
        </Grid>
        <Grid item xs={0}>
          <Button variant="contained" onClick={() => toggleModal()}>
            AddItems
          </Button>
        </Grid>
      </Grid>
      {historySwitch && (
        <Typography variant="h2" align="center">
          BUY ORDER HISTORY
        </Typography>
      )}
      {!historySwitch && (
        <Typography variant="h2" align="center">
          SELL ORDER HISTORY
        </Typography>
      )}

      {historySwitch
        ? userBuyHistory.map((order, orderIndex) => {
            console.log(order.orderdate)
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
                      {order.orderItems.map((item, itemIndex) => (
                        <TableRow>
                          <TableCell>{item.title}</TableCell>
                          <TableCell align="right">{item.amount}</TableCell>
                          <TableCell align="right">
                            {item.price['$numberDecimal']}
                          </TableCell>
                          <TableCell align="right">
                            {item.price['$numberDecimal'] * item.amount}
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
          })
        : userSellHistory.map((order, orderIndex) => {
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
                      {order.sellItems.map((item, itemIndex) => (
                        <TableRow>
                          <TableCell>{item.title}</TableCell>
                          <TableCell align="right">{item.amount}</TableCell>
                          <TableCell align="right">
                            {item.price['$numberDecimal']}
                          </TableCell>
                          <TableCell align="right">
                            {item.price['$numberDecimal'] * item.amount}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Date</TableCell>
                        <TableCell align="right">{order.orderdate}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>Address</TableCell>
                        <TableCell align="right">{order.address}</TableCell>
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
        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content" style={{height:'70%'}}>
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  AddItems
                </Typography>
                <Box component="form" onSubmit={addItems}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Item Name"
                    name="title"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="price"
                    label="Price"
                    type="price"
                    id="price"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="img"
                    label="image url"
                    name="img"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    // onClick={toggleModal}
                  >
                    submit
                  </Button>
                  </Box>
                </Box>
              </Container>
              <button className="close-modal" onClick={toggleModal}>
                X
              </button>
            </div>
          </div>
        )}
      <Button variant="outlined" onClick={onLogout}>
        logout
      </Button>
    </div>
  )
}
export default Profile
