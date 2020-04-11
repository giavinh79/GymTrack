import React from 'react';
import { Breadcrumb, BreadcrumbItem, Navbar, NavbarBrand, NavbarText } from 'reactstrap';
import './HomebarStyles.css';

export default function Homebar() {
  return (
    <Navbar light style={{ width: '100%', justifyContent: 'center' }}>
      <Breadcrumb tag='nav' listTag='div' className='bread-wrapper'>
        <BreadcrumbItem tag='a' href='#' active>
          Home
        </BreadcrumbItem>
        {/* <BreadcrumbItem tag='a'>
          Library
        </BreadcrumbItem>
        <BreadcrumbItem tag='a' active>
          Data
        </BreadcrumbItem> */}
      </Breadcrumb>
      <NavbarBrand href='/' style={{ position: 'absolute' }}>
        <span>Gym</span>
        <span style={{ color: '#3e41ab' }}>Track</span>
        <i className='fas fa-running' style={{ margin: '0 1rem' }}></i>
      </NavbarBrand>
      <NavbarText
        style={{
          backgroundColor: '#736e9e',
          color: 'white',
          borderRadius: '10px',
          boxShadow: '0 0 black',
          padding: '0.3rem 1rem',
          marginLeft: 'auto',
          cursor: 'pointer',
        }}
      >
        Logout
      </NavbarText>
    </Navbar>
  );
}
