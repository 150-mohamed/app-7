import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar/Navbar.jsx';
import Home from './Home/Home.jsx';
import About from './About/About.jsx';
import Movies from './Movies/Movies.jsx';
import People from './People/People.jsx';
import Register from './Register/Register.jsx';
import Login from './Login/Login.jsx';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';


function App() {
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      getUserData();
    }
  }, [])
  function getUserData() {
    let decodedToken = jwtDecode(localStorage.getItem('userToken'));
    setUserData(decodedToken);
  }
  useEffect(() => { console.log(userData) }, [userData])
  function logOut() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login');
  }
  function ProtectedRoute({ children }) {
    if (!localStorage.getItem('userToken')) {
      return <Navigate to='/login' />
    }
    else {
      return children;
    }
  }
  return <>
    <Navbar userData={userData} logOut={logOut} />
    <div className='container'>
      < Routes >
        <Route path='/' element={<Home />} />
        <Route path='home' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path='people' element={<ProtectedRoute><People /></ProtectedRoute>} />
        <Route path='movies' element={<ProtectedRoute><Movies /></ProtectedRoute>} />
        <Route path='about' element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login getUserData={getUserData} />} />
      </Routes >
    </div >

  </>
}

export default App;
