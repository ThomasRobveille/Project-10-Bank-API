import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';

import { Provider, useSelector } from 'react-redux'
import store from "./store/store"

import HomePage from './pages/HomePage';
import DashboardPage  from './pages/DashboardPage';
import SignInPage from './pages/Sign_inPage';

function App() {
  const [user, setUser] = useState(null);

  const token = useSelector(state => state.token)

  const login = () => setUser(true);
  const logout = () => setUser(false);

  useEffect(() => {
    if (localStorage.getItem('token')){
      login()
    }
  }, [])

  const RequireAuth = ({ user, children }) => { 
    const location = useLocation();
    if(localStorage.getItem('token')){
      login()
      user = true
    }
    return user ? children : <Navigate to={{pathname: '/sign_in', state: { from: location }}} replace/>;
  };

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path='/user' element={
            <RequireAuth user={token}>
              <DashboardPage path="/user" element={<DashboardPage/>}/>
            </RequireAuth> 
          }/>               
          <Route path="/sign_in" element={<SignInPage/>}/>
        </Routes>
      </Router> 
    </Provider>
  );
}

export default App;
