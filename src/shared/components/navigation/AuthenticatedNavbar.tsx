import { ReactElement, useState } from 'react';
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Group,
  ThemeIcon,
  Space,
  useMantineColorScheme,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { auth } from 'src/auth/firebase';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.white,
    opacity: 0.85,

    '&:hover': {
      opacity: 1,
      backgroundColor: theme.colors[theme.primaryColor][5],
    },
  },

  active: {
    opacity: 1,
    '&, &:hover': {
      backgroundColor: theme.colors[theme.primaryColor][7],
    },
  },
}));

interface INavbarLinkProps {
  icon: ReactElement;
  label: string;
  active?: boolean;
  onClick?(): void;
}

const NavbarLink = ({ icon, label, active, onClick }: INavbarLinkProps) => {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position='right' withArrow transitionDuration={0}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        {icon}
      </UnstyledButton>
    </Tooltip>
  );
};

const useNavbarStyles = createStyles((theme) => ({
  navbar: {
    position: 'fixed',
    borderRight: 'medium none',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors[theme.primaryColor][6],
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display: 'none',
    },
  },
}));

export const AuthenticatedNavbar = (): ReactElement => {
  const navigate = useNavigate();
  const [active, setActive] = useState<number>(0);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { classes } = useNavbarStyles();

  const isDarkTheme = colorScheme === 'dark';

  const NAVBAR_ROUTES = [
    { icon: <i className='fas fa-home' />, label: 'Home', onClick: () => navigate('/home') },
    { icon: <i className='fas fa-question' />, label: 'Help', onClick: () => navigate('/home/details/tues') }, // @TODO - update
    { icon: <i className='fas fa-cogs' />, label: 'Settings', onClick: undefined },
  ];

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
    <Navbar width={{ base: 80 }} p='md' className={classes.navbar}>
      <Center>
        <ThemeIcon variant='light' radius='xl' size='xl' color='violet'>
          <i className='fas fa-running' />
        </ThemeIcon>
      </Center>
      <Space h='xl' />
      <Navbar.Section grow mt={50}>
        <Group direction='column' align='center' spacing={0}>
          {NAVBAR_ROUTES.map((link, index) => (
            <NavbarLink
              {...link}
              key={link.label}
              active={index === active}
              onClick={() => {
                setActive(index);
                link.onClick && link.onClick();
              }}
            />
          ))}
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        <Group direction='column' align='center' spacing={0}>
          <NavbarLink
            icon={<i className={isDarkTheme ? 'fas fa-moon' : 'fas fa-sun'} />}
            label='Change theme'
            onClick={() => toggleColorScheme()}
          />
          <NavbarLink icon={<i className='fas fa-sign-out-alt' />} label='Logout' onClick={handleLogout} />
        </Group>
      </Navbar.Section>
    </Navbar>
  );
};
