import { AxiosInstance } from 'axios';
import apiConfig, { ApiStore } from './apiConfig';
import { CustomApiClient } from './baseApi';

export class StoreApi extends CustomApiClient<ApiStore> {
  constructor(mainHttpClient: AxiosInstance) {
    super(mainHttpClient, apiConfig.store);
  }
  ping(): Promise<any> {
    return this.client.get(this.methods.ping);
  }
}
