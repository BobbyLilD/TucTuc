import { action, makeObservable, observable } from 'mobx';
import { userData } from '../types';


class UserStore {
  access_token: string | undefined | null;
  userData: userData | undefined;

  showClientAuth: boolean;

  phoneValid: boolean;
  messageCode: string | undefined;

  checkAccessToken = () => {
    this.getUserInfo();
  };

  getUserInfo = () => {
    this.userData = {
      name: 'Todd',
      phone: '+7 (916) 746-85-22',
      email: 'bethesda@gmail.com',
    };
  };

  setPhoneNum = (phone: string) => {
    console.log(phone);
    this.phoneValid = !this.phoneValid;
  };

  setMessageCode = (code: string) => {
    this.messageCode = code;
  };

  changeClientAuthState = () => {
    this.showClientAuth = !this.showClientAuth;
  };

  changeAccessToken = (token: string) => {
    this.access_token = token;
    console.log('token set!');
    localStorage.setItem('accessToken', token);
    console.log(this.access_token);
  };

  deleteAccessToken = () => {
    localStorage.removeItem('accessToken');
    this.access_token = undefined;
  };

  constructor() {
    this.phoneValid = false;
    this.showClientAuth = false;
    if (localStorage.getItem('accessToken') != null) {
      console.log('token found');
      this.access_token = localStorage.getItem('accessToken');
      console.log(this.access_token);
    }

    makeObservable(this, {
      access_token: observable,
      changeAccessToken: action,
      deleteAccessToken: action,
      checkAccessToken: action,

      userData: observable,
      setPhoneNum: action,

      messageCode: observable,
      setMessageCode: action,

      phoneValid: observable,

      showClientAuth: observable,
      changeClientAuthState: action,
    });
  }
}

export default UserStore;
