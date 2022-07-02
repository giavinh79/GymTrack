import { createStyles } from '@mantine/core';

import tiredFromWorkoutPicture from 'src/assets/images/common/workout-tired-error.png';
import { Header } from 'src/features';

const useErrorFallbackStyles = createStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorWrapper: {
    margin: '100px 20px 0 20px',
  },
  image: {
    padding: '20px 50px 0 50px',
    width: '100%',
    maxWidth: '1000px',
  },
  link: {
    margin: '0 0.3rem', // @TODO - to fix when added to internationalization
    color: theme.colorScheme === 'dark' ? theme.colors.blue[3] : theme.colors.blue[7],
  },
}));

export const ErrorFallback = () => {
  const { classes } = useErrorFallbackStyles();

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.errorWrapper}>
        <strong>Sorry! It looks like we are having some issues - our team has been notified.</strong>
        <br />
        <span>
          Please refresh and try again. Email
          <a href='mailto:giavinhlam@gmail.com' className={classes.link}>
            giavinhlam@gmail.com
          </a>
          if you continue to have problems!
        </span>
      </div>
      <img className={classes.image} src={tiredFromWorkoutPicture} alt='man sitting down tired after workout' />
    </div>
  );
};
