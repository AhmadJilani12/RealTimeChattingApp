import { useState } from 'react'
import React  from 'react';
import './App.css'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';
import { Routes , Route } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
function App() {
  const [count, setCount] = useState(0)
  const {authUser} = useAuthStore()
  return (
  <>
  <Navbar />

  <Routes>
    <Route path='/' element={<HomePage/>} />
    <Route path='/signup' element={<SignUpPage/>} />
    <Route path='/login' element={<LoginPage/>} />
    <Route path='/settings' element={<SettingPage/>} />
    <Route path='/profile' element={<ProfilePage/>} />
    
  </Routes>
  </>
  )
}

export default App
