import { ReactElement, useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import { Logo } from 'src/components/common/logo/Logo';
import { LINKS } from 'src/shared/constants';
import { LoginModal } from 'src/features';

import './styles/header.scss';

export const Header = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggle = (): void => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <>
      {showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal} />}
      <div className='header-wrapper'>
        <Navbar color='light' light expand='md' className='navbar' style={{ padding: '.5rem 1.5rem' }}>
          <NavbarBrand href='/'>
            <Logo />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                <NavLink href={LINKS.GITHUB}>GitHub</NavLink>
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
