import axios from 'axios'
const API_URL = '/api/userAccount/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    sessionStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    sessionStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

//logout user
const logout = () => {
  sessionStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
