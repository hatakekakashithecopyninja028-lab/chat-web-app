import React from 'react'
import Navbar from './component/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Setting from './pages/Setting'
import Home from './pages/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authstore'
import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Otherprofile from './component/Otherprofile'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth,onlineUsers } = useAuthStore();
console.log(onlineUsers,"online")

useEffect(() => {
  checkAuth();
}, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className=''>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to="/login"/>} />
        <Route path='/login' element={!authUser ? <Login />: <Navigate to="/" />} />
        <Route path='/signup' element={!authUser ? <Signup />: <Navigate to="/" />} /> 
        <Route path='/profile' element={authUser ?  <Profile />: <Navigate to="/login"/>} />
        <Route path='/setting' element={ authUser ? <Setting />: <Navigate to="/login"/>} />
        <Route path='/otherprofile' element={ authUser ? <Otherprofile />: <Navigate to="/login"/>} />
      </Routes>


<Toaster/>
    
    </div>
  )
}

export default App