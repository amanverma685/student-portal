import '../App.css';
import { useState, React } from 'react';
import axios from "axios";
import logo from '../Assets/logo.svg';


import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';

function LoginForm() {

  const baseURL = "http://localhost:9090/student_portal-1.0-SNAPSHOT/api/admin/login";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  var okstatus = 0;

  const handleChange_email = event => {
    setEmail(event.target.value);
  };

  const handleChange_password = event => {
    setPassword(event.target.value);
  };


  const submitCredentials = async (event) => {

    await axios.post(baseURL,
      {
        "email": email,
        "password": password
      }).then((response) => {

        okstatus = response.status;
        console.log(response.status);
        if (okstatus === 200) {
          window.sessionStorage.setItem('status', okstatus);
          window.location.reload(true);
        }

        else
          return alert("INVALID CREDENTIALS... PLEASE TRY AGAIN...")

      });

  }

  return (
    <MDBContainer style={{ maxWidth: "80%" }}>

      <MDBRow>

        <MDBCol >
          <img src={logo} style={{ width: 650, height: 650 }} alt="Phone" />
        </MDBCol>

        <MDBCol className="fixed-center">
          <MDBRow style={{ justifyContent: 'center', marginBottom: '.6rem', display: 'flex', fontSize: 30, fontFamily: 'serif' }}>
            Login
          </MDBRow>


          <MDBInput wrapperClass='mb-4' onChange={handleChange_email} value={email} label='Email address' id='forControlLg' type='email' size="lg" />
          <MDBInput wrapperClass='mb-4' onChange={handleChange_password} value={password} label='Password' id='formControlLg' type='password' size="lg" />


          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" onClick={submitCredentials}>Sign in</MDBBtn>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR Login </p>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
            <MDBIcon fab icon="facebook-f" className="mx-2" />
            Continue with facebook
          </MDBBtn>

          <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#55acee' }}>
            <MDBIcon fab icon="twitter" className="mx-2" />
            Continue with twitter
          </MDBBtn>

        </MDBCol>

      </MDBRow>


    </MDBContainer>

  );
}

export default LoginForm;