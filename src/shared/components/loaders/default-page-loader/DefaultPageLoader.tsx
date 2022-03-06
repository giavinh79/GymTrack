import { Runner } from './Runner';

export const DefaultPageLoader = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 'inherit',
        flexDirection: 'column',
        backgroundColor: '#f6f6f6',
      }}>
      <Runner />
    </div>
  );
};
