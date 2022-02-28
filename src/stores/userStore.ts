import { action, makeObservable, observable } from "mobx";


class UserStore{
    access_token: string | undefined | null;
    name: string | undefined;
    surname: string | undefined;

    showClientAuth: boolean;

    phoneNum: string | undefined;
    phoneValid: boolean;
    messageCode: string | undefined;

    setPhoneNum = (phone: string) => {
        this.phoneNum = phone;
        this.phoneValid = true;
    }

    setMessageCode = (code: string) => {
        this.messageCode = code;
    }

    changeClientAuthState = () => {
        this.showClientAuth = !this.showClientAuth;
    }

    constructor() {
        this.phoneValid = false;
        this.showClientAuth = false;
        if (localStorage.getItem('accessToken')!= null){
            console.log('token found');
            this.access_token = localStorage.getItem('accessToken');
            console.log(this.access_token);
        }

        {
            this.name = 'Иван';
            this.surname = 'Иванов';
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
}

export default UserStore;