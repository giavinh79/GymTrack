import { FormEvent, memo, ReactElement } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Stack, Title } from '@mantine/core';

import fitnessBackground from 'src/assets/images/landing/landing_page_fitness.svg';
import { Header, SignupRequest } from 'src/features';

import { useMobileLandingPageStyles } from './MobileLandingPage.styles';

interface IMobileLandingPageProps {
  handleSignup: (e: FormEvent) => void;
  setSignupEmail: (signupEmail: string) => void;
}

export const MobileLandingPageComponent = ({ handleSignup, setSignupEmail }: IMobileLandingPageProps): ReactElement => {
  const { t } = useTranslation('landing');

  const { classes } = useMobileLandingPageStyles();

  return (
    <div className={classes.container}>
      <Header />
      <>
        <Stack className={classes.body}>
          <img
            src={fitnessBackground}
            alt={t('landing:FITNESS_BACKGROUND_IMAGE_ALT')}
            className={classes.fitnessBackground}
          />
          <Stack align='center' className={classes.content}>
            <Title className={classes.header}>
              <Trans t={t} i18nKey='FIRST_HEADER'>
                <strong className={classes.headerPrefix}>Track</strong> your fitness journey.
              </Trans>
            </Title>
            <Title className={classes.header}>
              <Trans t={t} i18nKey='SECOND_HEADER'>
                <strong className={classes.headerPrefix}>Start</strong> today for free.
              </Trans>
            </Title>
            <SignupRequest handleSignup={handleSignup} setSignupEmail={setSignupEmail} />
          </Stack>
        </Stack>
      </>
    </div>
  );
};

export const MobileLandingPage = memo(MobileLandingPageComponent);
