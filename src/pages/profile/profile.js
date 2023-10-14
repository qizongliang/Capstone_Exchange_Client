import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userSelector, useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../../redux/slice/authSlice'
import Button from '@mui/material/Button'

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <div>
      <h1>profile</h1>
      <Button variant="outlined" onClick={onLogout}>
        logout
      </Button>
    </div>
  )
}
export default Profile
