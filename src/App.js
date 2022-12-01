import React from 'react';
import './App.css';
import NavbarHeader from './Components/NavBarHeader';
import HomeScreen from './Components/Home';

import LoginForm from './Components/Login';
function App() {

  var status = window.sessionStorage.getItem('status');
  // console.log("app js",status);
  
  return (
    <div>
      <NavbarHeader />
      <br />
      <div className='Container' >
        {
          (status===null) && <LoginForm/>
        }
        {
          (status!==null) && <HomeScreen /> 
        }
    </div>
    </div>
     
  );
}

export default App;

