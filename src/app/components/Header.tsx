import React, { useState, FunctionComponent } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

interface IProps {
  test?: boolean;
}

const Header: FunctionComponent<IProps> = (props) => {
  const { test } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        zIndex: 2,
        width: test ? '100%' : 'inherit',
        maxWidth: test ? 'auto' : '80rem',
      }}
    >
      <Navbar color='light' light expand='md' style={{ padding: '.5rem 1.5rem' }}>
        <NavbarBrand href='/'>
          <span>Gym</span>
          <span style={{ color: '#3e41ab' }}>Track</span>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink href='/components/'>About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='https://github.com/reactstrap/reactstrap'>Learn</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='https://github.com/reactstrap/reactstrap'>Help</NavLink>
            </NavItem>
          </Nav>
          <NavLink
            style={{
              backgroundColor: '#736e9e',
              color: 'white',
              borderRadius: '10px',
              boxShadow: '0 0 black',
              padding: '0.3rem 1rem',
              // margin: '0.5rem', only for mobile
            }}
            href='https://github.com/reactstrap/reactstrap'
          >
            Login
          </NavLink>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
