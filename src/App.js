import React from 'react';
import './App.css';
import OffcanvasExample from './Components/NavBarHeader';

import LoginForm from './Components/Login';
function App() {
  return (
    <div>
      <OffcanvasExample />
      <br />
      <div className='Container'>
        <div class="row">    
          <LoginForm />       
        </div>
    </div>
    </div>
     
  );
}

export default App;
