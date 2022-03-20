import { createStyles } from '@mantine/core';

export const useSignupRequestStyles = createStyles((theme) => ({
  signupForm: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    width: '100%',
    padding: '2rem 0',
  },
  signupInput: {
    width: '100%',
    paddingRight: '11.3rem',
    zIndex: 1,
  },
  signupButton: {
    position: 'absolute',
    right: 0,
    zIndex: 2,
    backgroundColor: theme.colors.violet[6],
  },
}));
