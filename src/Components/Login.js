import React from 'react';
import '../App.css';

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
  return (
    <MDBContainer fluid style={{maxWidth:"90%"}}>

      <MDBRow>
        
        <MDBCol >
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"  alt="Phone" />
        </MDBCol>
        
        <MDBCol> 

          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>


          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg">Sign in</MDBBtn>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
            <MDBIcon fab icon="facebook-f" className="mx-2"/>
            Continue with facebook
          </MDBBtn>

          <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#55acee'}}>
            <MDBIcon fab icon="twitter" className="mx-2"/>
            Continue with twitter
          </MDBBtn>
         

        </MDBCol>
        
      </MDBRow>

    </MDBContainer>
    // <>
    // <section className="vh-100">
    //   <div className="container py-5 h-100">
    //     <div className="row d-flex align-items-center justify-content-center h-100">
    //       <div className="col-md-8 col-lg-7 col-xl-6">
    //         <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
    //           className="img-fluid" alt="Phone image"></img>
    //       </div>
    //       <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
    //         <form>
    //           {/* <!-- Email input --> */}
    //           <div className="form-outline mb-4">
    //             <input type="email" id="form1Example13" className="form-control form-control-lg" />
    //             <label className="form-label" for="form1Example13">Email address</label>
    //           </div>

    //           {/* <!-- Password input --> */}
    //           <div className="form-outline mb-4">
    //             <input type="password" id="form1Example23" className="form-control form-control-lg" />
    //             <label className="form-label" for="form1Example23">Password</label>
    //           </div>

    //           <div className="d-flex justify-content-around align-items-center mb-4">
    //             {/* <!-- Checkbox --> */}
    //             <div className="form-check">
    //               <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
    //               <label className="form-check-label" for="form1Example3"> Remember me </label>
    //             </div>
    //             <a href="#!">Forgot password?</a>
    //           </div>

    //           {/* <!-- Submit button --> */}
    //           <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>

    //           <div className="divider d-flex align-items-center my-4">
    //             <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
    //           </div>

    //           <a className="btn btn-primary btn-lg btn-block" style="background-color: #3b5998" href="#!"
    //             role="button">
    //             <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
    //           </a>
    //           <a className="btn btn-primary btn-lg btn-block" style="background-color: #55acee" href="#!"
    //             role="button">
    //             <i className="fab fa-twitter me-2"></i>Continue with Twitter</a>

    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    // </>
  );
}

export default LoginForm;