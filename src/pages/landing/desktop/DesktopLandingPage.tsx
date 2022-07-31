import React, { memo, ReactElement } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Grid, Space, Stack, Title } from '@mantine/core';

import fitnessBackground from 'src/assets/images/landing/landing_page_fitness.svg';
import { Header, SignupRequest } from 'src/features';

import { useDesktopLandingPageStyles } from './DesktopLandingPage.styles';

interface IDesktopLandingPageProps {
  handleSignup: (e: React.FormEvent) => void;
  setSignupEmail: (signupEmail: string) => void;
}

const DesktopLandingPageComponent = ({ handleSignup, setSignupEmail }: IDesktopLandingPageProps): ReactElement => {
  const { t } = useTranslation('landing');

  const { classes } = useDesktopLandingPageStyles();

  return (
    <div className={classes.container}>
      <Header />
      <>
        <Grid className={classes.body} gutter={0}>
          <Grid.Col sm={5}>
            <Stack align='center' spacing={0} style={{ marginTop: '2rem' }}>
              <Title className={classes.header}>
                <Trans t={t} i18nKey='FIRST_HEADER'>
                  <strong className={classes.headerPrefix}>Track</strong> your fitness journey.
                </Trans>
              </Title>
              <Space h='lg' />
              <Title className={classes.header}>
                <Trans t={t} i18nKey='SECOND_HEADER'>
                  <strong className={classes.headerPrefix}>Start</strong> today for free.
                </Trans>
              </Title>
              <Space h='xl' />
              <SignupRequest handleSignup={handleSignup} setSignupEmail={setSignupEmail} />
            </Stack>
          </Grid.Col>
          <Grid.Col sm={7}>
            <img
              src={fitnessBackground}
              alt={t('landing:FITNESS_BACKGROUND_IMAGE_ALT')}
              className={classes.fitnessBackground}
            />
          </Grid.Col>
        </Grid>
        <div className={classes.mountainBackground} />
        <div className={classes.mountainBackgroundGround} />
      </>
    </div>
  );
};

export const DesktopLandingPage = memo(DesktopLandingPageComponent);
