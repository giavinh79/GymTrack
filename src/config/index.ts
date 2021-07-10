interface IConfig {
  API_ENDPOINT: string
}

export const CONFIG: IConfig = {
  API_ENDPOINT: process.env.REACT_APP_ENDPOINT || 'http://localhost:3030'
}