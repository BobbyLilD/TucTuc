export interface ApiConfig {
  store: ApiStore;
}
export interface ApiStore {
  ping: string;
}

const apiConfig: ApiConfig = {
  store: {
    ping: 'store/version',
  },
};

export const storeRawApi: ApiStore = {
  ping: 'api/version',
};

export default apiConfig;
