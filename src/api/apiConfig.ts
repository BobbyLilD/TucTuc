export interface ApiConfig {
  store: ApiStore;
  documents: ApiDocuments;
}

export interface ApiDocuments {
  version: string;
}

export interface ApiStore {
  version: string;
}

const apiConfig: ApiConfig = {
  store: {
    version: 'store/version',
  },
  documents: {
    version: 'documents/version',
  },
};

export const documentsRawApi: ApiDocuments = {
  version: 'api/version',
};

export default apiConfig;
