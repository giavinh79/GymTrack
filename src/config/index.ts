interface IConfig {
  API_ENDPOINT: string;
  LOCAL_STORAGE: {
    EXPECT_SIGN_IN: string;
  };
}

export const CONFIG: IConfig = {
  API_ENDPOINT: process.env.REACT_APP_ENDPOINT || 'http://localhost:3030',
  LOCAL_STORAGE: {
    EXPECT_SIGN_IN: 'expectSignIn',
  },
};
