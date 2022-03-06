import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledLink = styled(Link)`
  font-size: 1.25rem;
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: none;
    color: black;
  }
`;

const RunningIcon = styled.i`
  margin: 0 1rem;
`;

export const Logo = () => {
  return (
    <StyledLink to='/'>
      <span>Gym</span>
      <span style={{ color: '#3e41ab' }}>Track</span>
      <RunningIcon className='fas fa-running' />
    </StyledLink>
  );
};
