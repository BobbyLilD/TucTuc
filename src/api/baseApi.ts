import axios, { AxiosInstance } from 'axios';
import { httpClient } from './apiClient';

export class CustomApiClient<T> {
  client: AxiosInstance;
  methods: T;

  constructor(mainHttpClient: AxiosInstance, methods: T) {
    this.client = mainHttpClient;
    this.methods = methods;
  }

  getUrl(): string | undefined {
    return httpClient.defaults.baseURL;
  }

  changeClient(url: string, rawMethods: T): void {
    this.client = axios.create({
      baseURL: url,
      // timeout: 5000,
    });
    this.methods = rawMethods;
  }
}
