// interface IUseAut

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CONFIG } from 'src/config';
import { loginUser, logoutUser, selectAuth } from 'src/slices';

import { auth } from './firebase';

export const useAuth = () => {
  const dispatch = useDispatch();
  // const user = useSelector(selectAuth);

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       dispatch(loginUser());
  //       localStorage.setItem(CONFIG.LOCAL_STORAGE.EXPECT_SIGN_IN, 'true');
  //     } else {
  //       localStorage.removeItem(CONFIG.LOCAL_STORAGE.EXPECT_SIGN_IN);
  //       dispatch(logoutUser());
  //     }
  //   });
  // }, [dispatch]);

  return auth.currentUser;
};
