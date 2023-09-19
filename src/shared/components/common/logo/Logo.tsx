import { Link } from 'react-router-dom';
import { createStyles, useMantineColorScheme } from '@mantine/core';

interface ILogoProps {
  enableLink?: boolean;
}

const useLogoStyles = createStyles((theme) => ({
  styledLinkContainer: {
    a: {
      fontSize: '1.25rem',
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? 'white' : 'black',

      '&:hover': {
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? 'white' : 'black',
      },
    },
  },
  styledContainer: {
    fontSize: '1.25rem',
    color: theme.colorScheme ? 'white' : 'black',
  },
}));

export const Logo = ({ enableLink = false }: ILogoProps) => {
  const { colorScheme } = useMantineColorScheme();
  const { classes } = useLogoStyles();

  const renderLogo = () => (
    <>
      <span style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>Gym</span>
      <span style={{ color: colorScheme === 'dark' ? '#9fa1e7' : '#3e41ab' }}>Track</span>
      <i className='fas fa-running' style={{ marginLeft: '1rem' }} />
    </>
  );

  return enableLink ? (
    <div className={classes.styledLinkContainer}>
      <Link to='/'>{renderLogo()}</Link>
    </div>
  ) : (
    <div className={classes.styledContainer}>{renderLogo()}</div>
  );
};
