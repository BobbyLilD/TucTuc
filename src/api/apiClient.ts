import axios from 'axios';
import config from '../../config';
import { Config } from '../types';
import { StoreApi } from './storeApi';

const { apiGateway } = config as Config;

export const httpClient = axios.create({
  baseURL: apiGateway.url,
  // timeout: 5000,
});

export const storeApi = new StoreApi(httpClient);

// storeApi.changeClient('http://localhost:3091', storeRawApi);
