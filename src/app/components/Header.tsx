import React, { useState, FunctionComponent } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import LoginModal from '../components/LoginModal';
import './HeaderStyles.css';

interface IProps {
  test?: boolean;
}

const Header: FunctionComponent<IProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        zIndex: 2,
        // width: test ? '100%' : 'inherit',
      }}
      className='header-wrapper'
    >
      {showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal} />}
      <Navbar color='light' light expand='md' style={{ padding: '.5rem 1.5rem' }} className='navbar'>
        <NavbarBrand href='/'>
          <span>Gym</span>
          <span style={{ color: '#3e41ab' }}>Track</span>
          <i className='fas fa-running' style={{ margin: '0 1rem' }}></i>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink href='/components/' disabled>
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='https://github.com/reactstrap/reactstrap' disabled>
                Learn
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='https://github.com/reactstrap/reactstrap' disabled>
                Help
              </NavLink>
            </NavItem>
          </Nav>
          <NavLink
            style={{
              backgroundColor: '#736e9e',
              color: 'white',
              borderRadius: '10px',
              boxShadow: '0 0 black',
              padding: '0.3rem 1rem',
              cursor: 'pointer',
            }}
            // href='https://github.com/reactstrap/reactstrap'
            onClick={() => {
              setShowLoginModal(true);
            }}
            className='nav-login'
            // onClick={() => setShowLoginModal(true)}
          >
            Login
          </NavLink>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
