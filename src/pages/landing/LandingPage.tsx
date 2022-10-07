import { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';

import { SignupModal } from 'src/features';
import { DesktopLandingPage } from 'src/pages/landing/desktop/DesktopLandingPage';
import { MobileLandingPage } from 'src/pages/landing/mobile/MobileLandingPage';
import { EModal, modalShown, selectModal } from 'src/slices';
import { useAppDispatch, useAppSelector } from 'src/stores/hooks';

export const LandingPage = () => {
  // render only one page at a time, otherwise you will run into scenario where two headers are active = two login modals may render
  const matches = useMediaQuery(`(min-width: 993px)`);

  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal);

  const [signupEmail, setSignupEmail] = useState('');

  const handleSignup = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(modalShown(EModal.SIGNUP));
  };

  return (
    <>
      {matches ? (
        <DesktopLandingPage handleSignup={handleSignup} setSignupEmail={setSignupEmail} />
      ) : (
        <MobileLandingPage handleSignup={handleSignup} setSignupEmail={setSignupEmail} />
      )}
      {modal === EModal.SIGNUP && <SignupModal signupEmail={signupEmail} />}
    </>
  );
};
