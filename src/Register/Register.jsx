import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  let [error, setError] = useState('');
  let [userError, setUserError] = useState([]);
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false)
  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: 0
  })
  function getInputData(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  async function register(e) {
    e.preventDefault()
    setIsLoading(true);
    let validationRes = validateUser(user);
    if (validationRes.error) {
      setIsLoading(false);
      setUserError(validationRes.error.details);
    } else {
      setIsLoading(true)
      let { data } = await axios.post("https://route-egypt-api.herokuapp.com/signup", user);
      if (data.message == "success") {
        navigate('/login')
        setIsLoading(false)
      } else {
        setError(data.message);
        setIsLoading(false)
      }
    }
  }
  function validateUser(user) {
    let schema = Joi.object({
      first_name: Joi.string().alphanum().required().min(3).max(10),
      last_name: Joi.string().alphanum().required().min(3).max(10),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,5}$/),
      age: Joi.number().min(16).max(30)
    });
    return schema.validate(user, { abortEarly: false })
  }
  return <>
    {error ? <div className="alert alert-danger">{error}</div> : ''}
    <form>
      {userError.map((err, index) => (
        <div className="alert alert-danger" key={index}>
          {err.message}</div>))}
      <div className="form-floating mb-3">
        <input onChange={getInputData} type="text" className="form-control" id="first_name" name='first_name' placeholder="name@example.com" />
        <label htmlFor="first_name">first_name</label>
      </div>
      <div className="form-floating mb-3">
        <input onChange={getInputData} type="text" className="form-control" id="last_name" name='last_name' placeholder="name@example.com" />
        <label htmlFor="last_name">last_name</label>
      </div>
      <div className="form-floating mb-3">
        <input onChange={getInputData} type="email" className="form-control" id="email" name='email' placeholder="name@example.com" />
        <label htmlFor="email">email</label>
      </div>
      <div className="form-floating mb-3">
        <input onChange={getInputData} type="password" className="form-control" id="password" name='password' placeholder="name@example.com" />
        <label htmlFor="password">password</label>
      </div>
      <div className="form-floating mb-3">
        <input onChange={getInputData} type="number" className="form-control" id="age" name='age' placeholder="name@example.com" />
        <label htmlFor="age">age</label>
      </div>
      <button className='btn btn-lg btn-info text-white d-flex ms-auto' onClick={register}>
        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'register'}
      </button>
    </form>
  </>

}
