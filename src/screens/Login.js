import React from 'react';
import Menu from '../components/Menu'
import '../style/login.scss'
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

const Login=()=> {
  return (
    <div>
        <Menu/>

        <MDBContainer className="p-3 " >


        <MDBRow  id='login' >
          <h2> Login  </h2>
           
          <MDBCol  col='4' md='6'>


            <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="md"/>
            <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="md"/>


            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            </div>

            <MDBBtn className="mb-4 w-100 bg-danger" size="md">Login</MDBBtn>

          

          </MDBCol>

        </MDBRow>

        </MDBContainer>
    </div>
    
  );
}

export default Login;

// import React from 'react'



// const Login = () => {
  
  
//   return (
//     <div>
//       <Menu />

     
//     </div>
//   )
// }

// export default Login