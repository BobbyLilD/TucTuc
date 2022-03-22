import { action, makeObservable, observable } from 'mobx';
import { userData } from '../types';


class UserStore {
  access_token: string | undefined | null;
  logged_in: boolean;
  userData: userData | undefined;

  showClientAuth: boolean;
  showClientRegistration: boolean;

  phoneValid: boolean;
  messageCode: string | undefined;

  registerUser = (data: userData) => {
    this.getAccessToken();
  }

  changeClientRegistrationState = () => {
    this.showClientRegistration = !this.showClientRegistration
  }

  checkAccessToken = () => {
    if(localStorage.getItem('accessToken') != undefined){
      this.logged_in = true;
      this.getUserInfo();
    }
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

  getAccessToken = () => {
    this.phoneValid = !this.phoneValid;
    this.logged_in = !this.logged_in;
    localStorage.setItem('accessToken', 'access');
    this.getUserInfo();
  }

  deleteAccessToken = () => {
    localStorage.removeItem('accessToken');
    this.logged_in = false;
  };

  constructor() {
    this.showClientRegistration = false;
    this.logged_in = false;
    this.phoneValid = false;
    this.showClientAuth = false;
    this.checkAccessToken();

    makeObservable(this, {
      logged_in: observable,
      deleteAccessToken: action,
      checkAccessToken: action,
      getAccessToken: action,

      userData: observable,
      setPhoneNum: action,

      messageCode: observable,
      setMessageCode: action,

      phoneValid: observable,

      showClientAuth: observable,
      changeClientAuthState: action,

      showClientRegistration: observable,
      changeClientRegistrationState: action,
      registerUser: action
    });
  }
}

export default UserStore;
