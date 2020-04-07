import React from 'react';
import { Navbar, NavbarBrand, NavbarText } from 'reactstrap';

export default function Homebar() {
  return (
    <Navbar light style={{ width: '100%', justifyContent: 'center' }}>
      <NavbarBrand href='/' style={{ position: 'absolute' }}>
        <span>Gym</span>
        <span style={{ color: '#3e41ab' }}>Track</span>
      </NavbarBrand>
      <NavbarText style={{ marginLeft: 'auto' }}>Logout</NavbarText>
    </Navbar>
  );
}
