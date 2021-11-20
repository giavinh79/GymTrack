import { useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import LoginModal from '../authentication/login-modal/LoginModal';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../slices/auth/authSlice';
import { auth } from '../../auth/firebase';
import { useLocation, useNavigate } from 'react-router-dom';

import './styles/header.scss';

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const dispatch = useDispatch();

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(loginUser());

        if (pathname === '/') {
          navigate('/home');
        }
      }
    });
  }, [navigate, pathname, dispatch]);

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
                <NavLink href='https://github.com/GV79/GymTrack' disabled>
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
              }}>
              <i className='fas fa-sign-in-alt'></i> Login
            </NavLink>
          </Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
