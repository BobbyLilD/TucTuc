import { AxiosResponse } from 'axios';
import { action, makeObservable, observable } from 'mobx';
import { pingDocuments, pingStore } from '../api/apiClient';

class ServiceStatusStore {
  converterStatus: number | undefined;
  storeStatus: number | undefined;

  constructor() {
    this.pingServices.bind(this)();
    makeObservable(this, {
      converterStatus: observable,
      storeStatus: observable,
      pingServices: action,
    });
  }

  pingServices = () => {
    pingDocuments()
      .then((response: AxiosResponse) => (this.converterStatus = response.status))
      .catch((error) => {
        this.converterStatus = error.message;
      });
    pingStore()
      .then((response: AxiosResponse) => {
        this.storeStatus = response.status;
      })
      .catch((error) => {
        this.storeStatus = error.message;
      });
  };
}

export default ServiceStatusStore;
