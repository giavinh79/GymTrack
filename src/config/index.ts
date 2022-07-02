interface IConfig {
  API_ENDPOINT: string;
  LOCAL_STORAGE: {
    EXPECT_SIGN_IN: string;
  };
}

export const CONFIG: IConfig = {
  API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3030/api/v1',
  LOCAL_STORAGE: {
    EXPECT_SIGN_IN: 'expectSignIn',
  },
};
