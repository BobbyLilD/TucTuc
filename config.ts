import { Config } from './src/types';

const config: Config = {
  apiGateway: {
    url: 'https://dev.handwriter.ru/api',
    // url: "http://localhost:8081/api",
  },

  debug: true,

  wsAddress: 'wss://dev.handwriter.ru/ws',
  metricaId: 0,
};

export default config;
