import axios, { AxiosInstance } from 'axios';
import config from '../../config';
import { Config } from '../types';
import apiConfig, { documentsRawApi } from './apiConfig';

const { apiGateway } = config as Config;

const endPoints = { ...apiConfig };

export const httpClient = axios.create({
  baseURL: apiGateway.url,
  // timeout: 5000,
});
// ========================
let httpClientDocuments: AxiosInstance | null = null;

function documentsHttpClient(): AxiosInstance {
  return httpClientDocuments ? httpClientDocuments : httpClient;
}

export function pingDocuments() {
  return documentsHttpClient().get(endPoints.documents.version);
}

export function pingStore() {
  return httpClient.get(endPoints.store.version);
}

export function changeDocumentsEndPoint(endpoint: string): string | null {
  if (httpClientDocuments) {
    const currentUri = httpClientDocuments.defaults.baseURL;
    if (currentUri == endpoint) {
      return null;
    }
  }

  httpClientDocuments = axios.create({
    baseURL: endpoint,
  });
  endPoints.documents = documentsRawApi;

  return endpoint;
}

export function getDocumentsEndPoint(): string {
  return String(
    httpClientDocuments ? httpClientDocuments.defaults.baseURL : httpClient.defaults.baseURL,
  );
}
