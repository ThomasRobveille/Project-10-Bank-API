import react, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { userLogout, setUser } from "../store/LoginSlice"

import "../stylesheet/Header.css"
import ArgentBankLogo from "../assets/img/argentBankLogo.png"

export default function Header() {
  const [isLogged, setIsLogged] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.token)
  const userName = useSelector((state) => state.userName)

  async function userIsLogged(){
    if(token || localStorage.getItem('token')){
      const user = JSON.parse(sessionStorage.getItem('user'))
      dispatch(setUser(user))
      return setIsLogged(true)
    }
    return setIsLogged(false)
  }

  function logout(e){
    e.preventDefault()
    dispatch(userLogout())
    localStorage.removeItem('token')
    navigate("/")
  }

  useEffect(() => {
    userIsLogged()
  }, [])

  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src={ArgentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        {
          !isLogged ? (
            <a className="main-nav-item" href="/sign_in">
              <i className="fa fa-user-circle"></i>
              Sign In
            </a>
          ) : (
            <div className='infoLogin'>
              <a className="main-nav-item" href='/user'>
                <h3>{userName.firstName} {userName.lastName}</h3>
              </a>
              
              <a className="main-nav-item" onClick={logout}>
                <i className="fa fa-user-circle"></i>
                Sign Out
              </a>
            </div>
          )
        }
        
      </div>
    </nav>
  );
}