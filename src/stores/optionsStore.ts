import { action, observable, makeObservable } from 'mobx';

class OptionsStore {
  language: string | undefined;

  constructor() {
    makeObservable(this, {
      language: observable,
      changeLanguage: action,
    });
  }

  changeLanguage = (lang: string) => {
    this.language = lang;
  };
}

export default OptionsStore;
