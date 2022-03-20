import { ReactElement } from 'react';
import { Button, TextInput } from '@mantine/core';

import { useSignupRequestStyles } from './SignupRequest.styles';
import { useTranslation } from 'react-i18next';

interface ISignupRequestProps {
  handleSignup: (e: React.FormEvent) => void;
  setSignupEmail: (signupEmail: string) => void;
}

export const SignupRequest = ({ handleSignup, setSignupEmail }: ISignupRequestProps): ReactElement => {
  const { t } = useTranslation('landing');
  const { classes } = useSignupRequestStyles();

  return (
    <form onSubmit={handleSignup} className={classes.signupForm}>
      <TextInput
        size='lg'
        aria-label='email'
        placeholder={t('landing:SIGNUP.EMAIL_PLACEHOLDER')}
        type='email'
        required
        onChange={(e) => setSignupEmail(e.target.value)}
        className={classes.signupInput}
      />
      <Button size='lg' type='submit' className={classes.signupButton}>
        {t('landing:SIGNUP.BUTTON')}
      </Button>
    </form>
  );
};
