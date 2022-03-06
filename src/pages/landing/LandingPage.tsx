import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Group, TextInput } from '@mantine/core';

import { MobileLandingPage } from 'src/pages/landing/MobileLandingPage';
import { Header, SignupModal } from 'src/features';
import fitnessBackground from 'src/assets/images/landing/landing_page_fitness.svg';

import './LandingPageStyles.css';
import { useStyles } from './LandingPage.styles';

export const LandingPage = (): ReactElement => {
  const [signupEmail, setSignupEmail] = useState('');
  const [displaySignupModal, setDisplaySignupModal] = useState(false);

  const { t } = useTranslation();

  const { classes } = useStyles();

  const handleSignup = (e: React.FormEvent): void => {
    e.preventDefault();
    setDisplaySignupModal(true);
  };

  return (
    <>
      <div className={classes.container}>
        <Header />
        <>
          <Grid className={classes.grid} gutter={0}>
            <Grid.Col sm={5}>
              <Group direction='column' align='center' spacing={0} style={{ marginTop: '2rem' }}>
                <h1 style={{ fontSize: '3rem' }}>
                  <strong style={{ color: '#7f6d96' }}>Track</strong>
                  <span> your fitness journey.</span>
                </h1>
                <h1 style={{ fontSize: '3rem', margin: '2rem' }}>
                  <strong style={{ color: '#7f6d96' }}>Start</strong>
                  <span> today for free.</span>
                </h1>
                <form onSubmit={handleSignup} style={{ padding: '2rem 3rem', width: '100%' }}>
                  <Group spacing={0} style={{ position: 'relative', width: '100%' }}>
                    <TextInput
                      size='lg'
                      aria-label='email'
                      placeholder='Email Address'
                      type='email'
                      required
                      onChange={(e) => setSignupEmail(e.target.value)}
                      style={{ paddingRight: '11.3rem', zIndex: 1, width: '100%' }}
                    />
                    <Button
                      size='lg'
                      type='submit'
                      style={{ backgroundColor: '#736E9E', position: 'absolute', right: 0, zIndex: 2 }}>
                      {t('landing:SIGNUP.BUTTON')}
                    </Button>
                  </Group>
                </form>
              </Group>
            </Grid.Col>
            <Grid.Col sm={7}>
              <img
                src={fitnessBackground}
                alt='landing page fitness background'
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </Grid.Col>
          </Grid>
          <div className='mountain-background' />
          <div style={{ marginTop: '-13rem', height: '45%', width: '100%', backgroundColor: '#2f2f2f' }} />
        </>
      </div>
      <MobileLandingPage handleSubmit={handleSignup} />
      {displaySignupModal && <SignupModal setDisplaySignupModal={setDisplaySignupModal} signupEmail={signupEmail} />}
    </>
  );
};
