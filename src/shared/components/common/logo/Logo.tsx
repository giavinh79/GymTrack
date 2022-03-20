import { useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledLinkContainer = styled.div<{ isDarkTheme: boolean }>((props) => ({
  a: {
    fontSize: '1.25rem',
    textDecoration: 'none',
    color: props.isDarkTheme ? 'white' : 'black',

    '&:hover': {
      textDecoration: 'none',
      color: props.isDarkTheme ? 'white' : 'black',
    },
  },
}));

const StyledContainer = styled.div<{ isDarkTheme: boolean }>((props) => ({
  fontSize: '1.25rem',
  color: props.isDarkTheme ? 'white' : 'black',
}));

const RunningIcon = styled.i({
  marginLeft: '1rem',
});

interface ILogoProps {
  enableLink?: boolean;
}

export const Logo = ({ enableLink = false }: ILogoProps) => {
  const { colorScheme } = useMantineColorScheme();

  const isDarkTheme = colorScheme === 'dark';

  const renderLogo = () => (
    <>
      <span>Gym</span>
      <span style={{ color: isDarkTheme ? '#9fa1e7' : '#3e41ab' }}>Track</span>
      <RunningIcon className='fas fa-running' />
    </>
  );

  return enableLink ? (
    <StyledLinkContainer isDarkTheme={isDarkTheme}>
      <Link to='/'>{renderLogo()}</Link>
    </StyledLinkContainer>
  ) : (
    <StyledContainer isDarkTheme={isDarkTheme}>{renderLogo()}</StyledContainer>
  );
};
