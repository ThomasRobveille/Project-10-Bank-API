import React, { useEffect } from 'react';
import { SignInUser, DataUser } from "../services/SignIn"
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, setError, setUser } from "../store/LoginSlice";
import "../stylesheet/Sign_in.css";

import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Sign_in({login, logout, user}) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location.state?.from?.pathname

  useEffect(() => {
    if (user){
      navigate(from || "/", {replace: true})
    }
  }, [user, from, navigate])

  async function handleLogin(){
    let email = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (email === "" || password === ""){
      dispatch(setError("Username and password are required"));
      return alert("username/password are required");
    }
    let data = {
      email: email,
      password: password
    }
    try{
      const token = await SignInUser(data)
      dispatch(userLogin(token.body.token))
      let remerberMe = document.getElementById('remember-me')
      if(remerberMe.checked){
        localStorage.setItem('token', token.body.token)
      }
      const user = await DataUser(token.body.token)
      dispatch(setUser(user.body))
      navigate("/user")
    } catch(error){
      console.log(error)
    }        
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form >
          <div className="input-wrapper">
            <label>Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label>Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label>Remember me</label>
          </div>          
        </form>
        <button value="Sign In" className="sign-in-button" onClick={handleLogin}>Sign In</button>
      </section>
    </main>
  )
}