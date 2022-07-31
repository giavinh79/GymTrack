import { ReactElement } from 'react';
import { Burger, Container, createStyles, Group, Header } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Logo, ThemeToggle } from '../common';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'fixed',
    top: 0,
    borderBottom: 'transparent',
    width: '100%',
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  links: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  social: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));

export const AuthenticatedMobileNavbar = (): ReactElement => {
  const [opened, handlers] = useDisclosure(false);
  // const [active, setActive] = useState(links[0].link);
  const { classes } = useStyles();

  //   const location = useLocation();
  //   const navigate = useNavigate();

  // const handleLogout = () => {
  //   auth.signOut();
  //   localStorage.removeItem('expectSignIn');
  //   navigate('/');
  // };

  // const items = links.map((link) => (
  //   <a
  //     key={link.label}
  //     href={link.link}
  //     className={cx(classes.link, { [classes.linkActive]: active === link.link })}
  //     onClick={(event) => {
  //       event.preventDefault();
  //       setActive(link.link);
  //     }}
  //   >
  //     {link.label}
  //   </a>
  // ));

  return (
    <Header height={56} className={classes.header}>
      <Container className={classes.inner}>
        <Burger opened={opened} onClick={() => handlers.open()} size='sm' className={classes.burger} />
        <Group className={classes.links} spacing={5}>
          colol
        </Group>

        <Logo />

        <Group spacing={0} className={classes.social} position='right' noWrap>
          <ThemeToggle />
        </Group>
      </Container>
    </Header>
  );
};
