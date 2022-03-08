import { action, makeObservable, observable } from "mobx";


class UserStore{
    access_token: string | undefined | null;
    name: string | undefined;
    surname: string | undefined;
    phoneNum: string | undefined;
    email: string | undefined;

    showClientAuth: boolean;

    phoneValid: boolean;
    messageCode: string | undefined;

    setPhoneNum = (phone: string) => {
        this.phoneValid = !this.phoneValid;
    }

    setMessageCode = (code: string) => {
        this.messageCode = code;
    }

    changeClientAuthState = () => {
        this.showClientAuth = !this.showClientAuth;
    }

    changeAccessToken = (token: string) => {
        this.access_token = token;
        console.log('token set!');
        localStorage.setItem('accessToken', token);
        console.log(this.access_token);
    }

    deleteAccessToken = () => {
        localStorage.removeItem('accessToken');
        this.access_token = undefined;
    }

    changeName = (name: string) => {
        this.name = name;
    }

    changeSurname = (surname: string) => {
        this.surname = surname;
    }

    constructor() {
        this.name='Тод';
        this.surname='Говард';
        this.phoneNum='+7(916)746-85-22';
        this.email='bethesda@gmail.com';

        this.phoneValid = false;
        this.showClientAuth = false;
        if (localStorage.getItem('accessToken')!= null){
            console.log('token found');
            this.access_token = localStorage.getItem('accessToken');
            console.log(this.access_token);
        }

        makeObservable(this, {
            access_token: observable,
            changeAccessToken: action,
            deleteAccessToken: action,

            name: observable,
            changeName: action,

            surname: observable,
            changeSurname: action,

            phoneNum: observable,
            setPhoneNum: action,

            messageCode: observable,
            setMessageCode: action,

            phoneValid: observable,

            showClientAuth: observable,
            changeClientAuthState: action
        })
    }


}

export default UserStore;