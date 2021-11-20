import { Navbar, NavbarBrand, DropdownToggle, UncontrolledDropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import { auth } from '../../auth/firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/homebar.scss';

export default function Homebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('expectSignIn');
      navigate('/');
    } catch (err) {
      localStorage.removeItem('expectSignIn');
      navigate('/');
    }
  };

  return (
    <Navbar light style={{ backgroundColor: 'white', width: '100%', justifyContent: 'center' }}>
      {location.pathname !== '/home' && (
        <div className='icon'>
          <i className='fas fa-arrow-left' />
          <span>Go Back</span>
        </div>
      )}
      <NavbarBrand href='/' style={{ position: 'absolute' }} onClick={handleLogout}>
        <span>Gym</span>
        <span style={{ color: '#3e41ab' }}>Track</span>
        <i className='fas fa-running' style={{ margin: '0 1rem' }}></i>
      </NavbarBrand>
      <UncontrolledDropdown style={{ marginLeft: 'auto' }}>
        <DropdownToggle color='white' style={{ padding: '1px 6px' }}>
          <i className='fas fa-bars' style={{ padding: '1rem' }}></i>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>Home</DropdownItem>
          <DropdownItem disabled>Monday</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Navbar>
  );
}
