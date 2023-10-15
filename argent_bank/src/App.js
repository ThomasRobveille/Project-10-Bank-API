import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';


import HomePage from './pages/HomePage';
import DashboardPage  from './pages/DashboardPage';
import SignInPage from './pages/Sign_inPage';

function App() {
  const [user, setUser] = useState(null);

  const login = () => setUser(true);
  const logout = () => setUser(false);

  const RequireAuth = ({ user,children }) => { 
    const location = useLocation();
    return user ? children : <Navigate to={{pathname: '/sign_in', state: { from: location }}} replace/>;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/user' element={
          <RequireAuth user={user}>
            <DashboardPage path="/user" element={<DashboardPage/>}/>
          </RequireAuth> 
        }/>               
        <Route path="/sign_in" element={<SignInPage login={login} logout={logout} user={user}/>}/>
      </Routes>
    </Router> 
  );
}

export default App;
