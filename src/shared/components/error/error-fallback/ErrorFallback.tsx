import { Header } from 'src/features';
import tiredFromWorkoutPicture from 'src/assets/images/common/workout-tired-error.png';

export const ErrorFallback = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Header />
      <div style={{ margin: '100px 20px 0 20px' }}>
        <strong>Sorry! It looks like we're having some issues - our team has been notified.</strong>
        <br />
        <span>
          Please refresh and try again. Email <a href='mailto:giavinhlam@gmail.com'>giavinhlam@gmail.com</a> if you
          continue to have problems!
        </span>
      </div>
      <img style={{ padding: '20px 50px 0px 50px' }} src={tiredFromWorkoutPicture} />
    </div>
  );
};
