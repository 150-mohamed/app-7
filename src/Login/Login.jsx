import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Login(props) {
  let [error, setError] = useState('');
  let [userError, setUserError] = useState([]);
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false)
  let [user, setUser] = useState({
    email: "",
    password: ""
  })
  function getInputData(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  function validateUser(user) {
    let schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,5}$/)
    });
    return schema.validate(user, { abortEarly: false })
  }
  async function login(e) {
    e.preventDefault()
    setIsLoading(true)
    let validationRes = validateUser(user);
    if (validationRes.error) {
      setIsLoading(false)
      setUserError(validationRes.error.details);
    } else {
      setIsLoading(true)
      let { data } = await axios.post("https://route-egypt-api.herokuapp.com/signin", user);
      if (data.message == "success") {
        localStorage.setItem('userToken',data.token)
        setIsLoading(false)
        props.getUserData();
        navigate('/home')
      } else {
        setIsLoading(false)
        setError(data.message);
      }
    }
  }
  return <>
  <form>
      {userError.map((err,index) => (
        <div className="alert alert-danger" key={index}>
          {err.message}</div>))}
      {error ? <div className="alert alert-danger">{error}</div> : ''}
      <div className="form-floating mb-3">
        <input onChange={getInputData} type="email" className="form-control" id="email" name='email' placeholder="name@example.com" />
        <label htmlFor="email">email</label>
      </div>
      <div className="form-floating mb-3">
        <input onChange={getInputData} type="password" className="form-control" id="password" name='password' placeholder="name@example.com" />
        <label htmlFor="password">password</label>
      </div>
      <button className='btn btn-lg btn-info text-white d-flex ms-auto' onClick={login}>
        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'login'}
      </button>
    </form>
  </>

}
