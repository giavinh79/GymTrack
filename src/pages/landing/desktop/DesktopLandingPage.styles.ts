import { createStyles } from '@mantine/core';

export const useDesktopLandingPageStyles = createStyles((theme) => ({
  container: {
    display: 'block',
    width: '100%',
    position: 'relative',

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      display: 'none',
    },
  },
  body: {
    height: '51rem',
    paddingTop: '5rem',
    paddingLeft: '3rem',
    paddingRight: '3rem',
    width: '100%',
    flexWrap: 'nowrap',
  },
  header: {
    fontSize: '3rem',
  },
  headerPrefix: {
    color: theme.colors.violet[6],
  },
  fitnessBackground: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  mountainBackground: {
    position: 'absolute',
    height: '35rem',
    width: '100%',
    top: '7rem',
    zIndex: '-1',

    backgroundColor: '#bdbdbd',
    clipPath: 'polygon(44% 63%, 61% 14%, 81% 71%, 91% 55%, 100% 78%, 100% 100%, 100% 100%, 18% 100%, 37% 51%)',
  },
  mountainBackgroundGround: {
    marginTop: '-13rem',
    height: '45%',
    width: '100%',
    backgroundColor: '#2f2f2f',
  },
}));
