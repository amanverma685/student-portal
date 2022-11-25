import React from 'react';
import './App.css';
import NavbarHeader from './Components/NavBarHeader';

import LoginForm from './Components/Login';
function App() {
  return (
    <div style={{ marginTop: '.6rem' }}>
      <NavbarHeader />
      <br />
      <div className='Container' >
        <div class="row">    
          <LoginForm />       
        </div>
    </div>
    </div>
     
  );
}

export default App;
