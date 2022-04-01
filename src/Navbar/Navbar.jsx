import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-custom shadow mb-5">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fw-bold" to="/">Noxe</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {
                props.userData ? <>
                  <li className="nav-item">
                    <Link className="nav-link " to="/home">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to="/about">About</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to="/movies">Movies</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " to="/people">People</Link>
                  </li>
                </> : ''
              }
            </ul>

          </div>
        </div>

        <div className='social d-flex'>
          <i className='mx-2 fab fa-instagram'></i>
          <i className='mx-2 fab fa-facebook'></i>
          <i className='mx-2 fab fa-youtube'></i>
          <i className='mx-2 fab fa-twitter'></i>
        </div>
        <ul className="navbar-nav me-5 mb-2 mb-lg-0">
          {
            props.userData ? <>
              <li className="nav-item">
                <span onClick={props.logOut} className="nav-link ">Logout</span>
              </li>
            </> :
              <>
                <li className="nav-item">
                  <Link className="nav-link " to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/login">Login</Link>
                </li>
              </>
          }
        </ul>
      </nav>
    </>
  )
}


