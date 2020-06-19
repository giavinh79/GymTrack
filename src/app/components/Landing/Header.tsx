import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import LoginModal from '../Authentication/LoginModal';
import './styles/header.scss';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      {showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal} />}
      <div className='header-wrapper'>
        <Navbar color='light' light expand='md' className='navbar' style={{ padding: '.5rem 1.5rem' }}>
          <NavbarBrand href='/'>
            <span>Gym</span>
            <span style={{ color: '#3e41ab' }}>Track</span>
            <i className='fas fa-running' style={{ margin: '0 1rem' }}></i>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                <NavLink href='https://github.com/reactstrap/reactstrap' disabled>
                  Learn
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='https://github.com/reactstrap/reactstrap' disabled>
                  GitHub
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='https://github.com/reactstrap/reactstrap' disabled>
                  Help
                </NavLink>
              </NavItem>
            </Nav>
            <NavLink
              className='navbar__login'
              onClick={() => {
                setShowLoginModal(true);
              }}
            >
              Login
            </NavLink>
          </Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
