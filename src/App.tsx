import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import UserHomePage from './pages/UserHomepage'
import AdminPage from './pages/AdminHomePage'
import CreateItemModal from './components/itemForm'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserLogin/>}></Route>
        <Route path='/signup' element={<UserSignup/>}></Route>
        <Route path='/user/home' element={<UserHomePage/>}></Route>
        <Route path='/admin/home' element={<AdminPage/>}></Route>
        <Route path='/itemForm' element={<CreateItemModal/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
