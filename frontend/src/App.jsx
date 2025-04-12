import { useState } from 'react'
import React  from 'react';
import './App.css'
import Navbar from './components/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
  <Navbar />

  <Routes>
    <Route path='/' ></Route>
  </Routes>
  </>
  )
}

export default App
