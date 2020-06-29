import React from 'react';
import { Breadcrumb, BreadcrumbItem, Navbar, NavbarBrand, NavbarText } from 'reactstrap';
import firebase from '../../../auth/firebase';
import { useHistory } from 'react-router-dom';
import './styles/homebar.scss';

export default function Homebar() {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      localStorage.removeItem('expectSignIn');
      history.push('/');
    } catch (err) {
      localStorage.removeItem('expectSignIn');
      history.push('/');
    }
  };

  return (
    <>
      <Navbar light style={{ width: '100%', justifyContent: 'center' }}>
        {/* <NavbarText
        style={{
          backgroundColor: '#736e9e',
          color: 'white',
          borderRadius: '10px',
          boxShadow: '0 0 black',
          padding: '0.3rem 1rem',
          // marginLeft: 'auto',
          cursor: 'pointer',
        }}
        onClick={handleLogout}
      >
        <i className='fas fa-sign-out-alt'></i>
        Logout
      </NavbarText> */}

        <NavbarBrand href='/' style={{ position: 'absolute' }}>
          <span>Gym</span>
          <span style={{ color: '#3e41ab' }}>Track</span>
          <i className='fas fa-running' style={{ margin: '0 1rem' }}></i>
        </NavbarBrand>
        <i className='fas fa-bars' style={{ marginLeft: 'auto', padding: '1rem' }}></i>
        {/* <Breadcrumb tag='nav' listTag='div' className='bread-wrapper' style={{ marginLeft: 'auto' }}>
        <BreadcrumbItem tag='a' href='#' active>
          Home
        </BreadcrumbItem>
      </Breadcrumb> */}
      </Navbar>
    </>
  );
}
