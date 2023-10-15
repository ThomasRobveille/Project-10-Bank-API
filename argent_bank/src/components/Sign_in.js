import React, { useEffect } from 'react';
import "../stylesheet/Sign_in.css";

import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Sign_in({login, logout, user}) {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname

  useEffect(() => {
    if (user){
      navigate(from || "/", {replace: true})
    }
  }, [user, from, navigate])

  function handleLogin(){
    console.log("handleLogin")
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin()}>
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
          <input type="submit" value="Sign In" className="sign-in-button"/>
        </form>
      </section>
    </main>
  )
}