import { AxiosResponse } from 'axios';
import { action, makeObservable, observable } from 'mobx';
import { storeApi } from '../api/apiClient';

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
    storeApi
      .ping()
      .then((response: AxiosResponse) => {
        this.storeStatus = response.status;
      })
      .catch((error) => {
        this.storeStatus = error.message;
      });
  };
}

export default ServiceStatusStore;
