import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBBtn
} from 'mdb-react-ui-kit';
import { BsTwitter } from 'react-icons/bs'
import { BsInstagram } from 'react-icons/bs'
import { BsGithub } from 'react-icons/bs'
import { BsLinkedin } from 'react-icons/bs'


export default function App() {
  return (
    <MDBFooter className='bg-danger mt-4 text-center text-white'>
      <MDBContainer className='p-4 pb-0'>
        <section className='mb-4'>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#55acee' }}
            href='https://twitter.com/felat_aslan'
            role='button'
          >
            <BsTwitter/>
          </MDBBtn>

        
          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#ac2bac' }}
            href='https://www.instagram.com/felataslan/'
            target='_blank'
            role='button'
          >
            <BsInstagram/>
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#0082ca' }}
            href='https://www.linkedin.com/in/felat-aslan-53217a1a4/'
            target='_blank'
            role='button'
          >
            <BsLinkedin/>
          </MDBBtn>

          <MDBBtn
            
            className='m-1'
            style={{ backgroundColor: '#333333' }}
            href='https://github.com/felataslan'
            target='_blank'
            role='button'
          >
            <BsGithub/>
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
        CBU 2022 Thesis Project :  
        <a className='text-white ' target='blank' href='https://github.com/felataslan/ThesisProject'>
           https://github.com/felataslan/ThesisProject
        </a>
      </div>
    </MDBFooter>
  );
}