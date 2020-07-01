import React, { useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import LoginModal from '../Authentication/LoginModal';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, loginUser } from '../../../slices/authSlice';
import firebase from '../../../auth/firebase';
import { useHistory } from 'react-router-dom';
import './styles/header.scss';

const Header = () => {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginUser());

        if (history.location.pathname === '/') {
          history.push('/home');
        }
      }
    });
  }, [dispatch, history]);

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
