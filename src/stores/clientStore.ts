import { action, makeObservable, observable } from 'mobx';
import { CartItem, Item, Order, Restaurant } from '../types';

class ClientStore {
    showCart: boolean;
    showOrderList: boolean;
    showInfoForm: boolean;
    cart: Map<string,CartItem>;
    servings: number;
    orderSum: number;
    deliveryPrice: number;
    newOrder: Order;
    orderList: Map<string, Order>;

    changeShowCart = () =>{
        this.showCart = !this.showCart;
    }
    changeShowOrderList = () => {
        this.showOrderList = !this.showOrderList;
    }
    changeShowInfoForm = () => {
        this.showInfoForm = !this.showInfoForm;
    }
    addItemToCart = (id: string, name: string, price: number, restaurantID: string) => {
        if (this.cart.get(id) != undefined){
            let newItem: CartItem = {name: this.cart.get(id)!.name , 
                quantity: (this.cart.get(id)!.quantity + 1), 
                price: this.cart.get(id)!.price, 
                restaurantID: this.cart.get(id)!.restaurantID}
            this.cart.set(id, newItem);
        } else {
            this.cart.set(id, {name: name, quantity: 1, price: price, restaurantID});
        }
        this.orderSum += price;
        console.log(id)
        console.log(this.cart.get(id)!.quantity)
    }
    removeItemFromCart = (id: string) => {
        this.orderSum -= this.cart.get(id)!.price;
        if (this.cart.get(id)!.quantity > 1){
            let newItem: CartItem = {name: this.cart.get(id)!.name , 
                quantity: (this.cart.get(id)!.quantity - 1), 
                price: this.cart.get(id)!.price, 
                restaurantID: this.cart.get(id)!.restaurantID}            
            this.cart.set(id, newItem);
        } else if (this.cart.get(id)!.quantity == 1){
            this.cart.delete(id);
        }
    }

    addServing = () => {
        this.servings++;
    }

    removeServing = () => {
        this.servings--;
    }

    constructor() {
        this.newOrder = {
            name: undefined,
            surname: undefined,
            phone: undefined,
            address: undefined,
            flat: undefined,
            floor: undefined,
            entranceCode: undefined,
            promocode: undefined,
            paymentMethod: undefined,
            comment: undefined,
            items: undefined,
            servings: undefined,
            deliveryPrice: undefined,
            date: undefined,
        };
        this.orderList = new Map();
        this.deliveryPrice = 500;
        this.orderSum = 0 + this.deliveryPrice;
        this.servings = 1;
        this.cart = new Map();
        this.showCart = false;
        this.showOrderList = false;
        this.showInfoForm = false;
        makeObservable(this, {
            showCart: observable,
            changeShowCart: action,

            showOrderList: observable,
            changeShowOrderList: action,

            showInfoForm: observable,
            changeShowInfoForm: action,

            cart: observable,
            addItemToCart: action,
            removeItemFromCart: action,

            servings: observable,
            addServing: action,
            removeServing: action,

            orderSum: observable,

        })
    }
}

export default ClientStore;