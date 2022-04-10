import { action, makeObservable, observable } from 'mobx';
import { CartItem, comment, Item, Order, Restaurant } from '../types';

class ClientStore {
  showCart: boolean;
  showOrderList: boolean;
  showInfoForm: boolean;
  showCommentForm: boolean;

  cart: Map<string, CartItem>;
  servings: number;
  orderSum: number;
  deliveryPrice: number;
  newOrder: Order | undefined;
  orderList: Order[] | undefined;
  selectedCity: string;
  selectedComment: comment | undefined;

  changeSelectedComment = (index: number) => {
    if (index == undefined) {
      this.selectedComment = undefined;
    } else {
      this.selectedComment = this.orderList![index].comment;
    }
  };

  deleteOrder = (id: string) => {};

  deleteComment = (id: string) => {};

  changeShowCommentForm = () => {
    this.showOrderList = false;
    this.showCommentForm = !this.showCommentForm;
  };

  changeSelectedCity = (id: string) => {
    this.selectedCity = id;
  };

  getOrderList = () => {
    const newItem: Item = {
      id: 'dfknsdfnks',
      placeID: '21312',
      name: 'Удон с курицей',
      price: 450,
      discount: {percentage: 30},
      description: `Вкусное и яркое блюдо азиатской кухни порадует всех! Имея дома в шкафчике удон, 
              всегда можно быстро приготовить ужин для всей семьи`,
      category: 'Японская',
      imageSource: 'ndfngdfngd',
    };
    let itemsList = new Map();
    itemsList.set(newItem, 3);
    this.orderList = new Array();
    let newOrder: Order = {
      id: '9867685675765',
      name: 'Todd',
      surname: 'Howard',
      phone: '072384723982394',
      address: { address: 'Moscow', flat: '50', floor: 9, entranceCode: '50' },
      promocode: undefined,
      paymentMethod: undefined,
      comment: { id: 'sfhsjfks', text: 'dlhdshkhsdfhsf', rating: 3 },
      items: itemsList,
      servings: 4,
      deliveryPrice: 20,
      orderDate: new Date('2017-02-03'),
      deliveryDate: undefined,
      orderSum: 53453,
      placeName: 'McBoba',
      delivered: true,
      city: 'Moscow',
    };
    let newList = [newOrder, newOrder, newOrder, newOrder];
    this.orderList = [...newList];
  };

  getOrderListPreview = () => {
    const newItem: Item = {
      id: 'dfknsdfnks',
      placeID: '21312',
      name: 'Удон с курицей',
      price: 450,
      discount: {percentage: 30},
      description: `Вкусное и яркое блюдо азиатской кухни порадует всех! Имея дома в шкафчике удон, 
              всегда можно быстро приготовить ужин для всей семьи`,
      category: 'Японская',
      imageSource: 'ndfngdfngd',
    };
    let itemsList = new Map();
    itemsList.set(newItem, 3);
    this.orderList = new Array();
    let newOrder: Order = {
      id: '9867685675765',
      name: 'Todd',
      surname: 'Howard',
      phone: '072384723982394',
      address: { address: 'Moscow', flat: '50', floor: 9, entranceCode: '50' },
      promocode: undefined,
      paymentMethod: undefined,
      comment: { id: 'sfhsjfks', text: 'dlhdshkhsdfhsf', rating: 3 },
      items: itemsList,
      servings: 4,
      deliveryPrice: 20,
      orderDate: new Date('2017-02-03'),
      deliveryDate: undefined,
      orderSum: 53453,
      placeName: 'McBoba',
      delivered: true,
      city: undefined,
    };
    let newList = [newOrder, newOrder];
    this.orderList = [...newList];
  };

  changeShowCart = () => {
    this.showCart = !this.showCart;
  };
  changeShowOrderList = () => {
    this.showOrderList = !this.showOrderList;
  };
  changeShowInfoForm = () => {
    this.showInfoForm = !this.showInfoForm;
  };
  addItemToCart = (id: string, name: string, price: number, restaurantID: string) => {
    if (this.cart.get(id) != undefined) {
      let newItem: CartItem = {
        name: this.cart.get(id)!.name,
        quantity: this.cart.get(id)!.quantity + 1,
        price: this.cart.get(id)!.price,
        restaurantID: this.cart.get(id)!.restaurantID,
      };
      this.cart.set(id, newItem);
    } else {
      this.cart.set(id, { name: name, quantity: 1, price: price, restaurantID });
    }
    this.orderSum += price;
    console.log(id);
    console.log(this.cart.get(id)!.quantity);
  };
  removeItemFromCart = (id: string) => {
    this.orderSum -= this.cart.get(id)!.price;
    if (this.cart.get(id)!.quantity > 1) {
      let newItem: CartItem = {
        name: this.cart.get(id)!.name,
        quantity: this.cart.get(id)!.quantity - 1,
        price: this.cart.get(id)!.price,
        restaurantID: this.cart.get(id)!.restaurantID,
      };
      this.cart.set(id, newItem);
    } else if (this.cart.get(id)!.quantity == 1) {
      this.cart.delete(id);
    }
  };

  addServing = () => {
    this.servings++;
  };

  removeServing = () => {
    this.servings--;
  };

  initNewOrder = () => {
    this.newOrder = {
      id: undefined,
      name: undefined,
      surname: undefined,
      phone: undefined,
      address: undefined,
      promocode: undefined,
      paymentMethod: undefined,
      comment: undefined,
      items: new Map(),
      servings: undefined,
      deliveryPrice: undefined,
      orderDate: undefined,
      orderSum: 0,
      placeName: undefined,
      delivered: false,
      city: undefined,
    };
  };

  constructor() {
    this.selectedCity = 'None';
    this.deliveryPrice = 500;
    this.orderSum = 0 + this.deliveryPrice;
    this.servings = 1;
    this.cart = new Map();
    this.showCart = false;
    this.showOrderList = false;
    this.showInfoForm = false;
    this.showCommentForm = false;
    makeObservable(this, {
      showCart: observable,
      changeShowCart: action,

      showCommentForm: observable,
      changeShowCommentForm: action,
      selectedComment: observable,
      changeSelectedComment: action,
      deleteComment: action,

      showOrderList: observable,
      changeShowOrderList: action,
      orderList: observable,
      getOrderList: action,
      getOrderListPreview: action,
      deleteOrder: action,

      showInfoForm: observable,
      changeShowInfoForm: action,

      cart: observable,
      addItemToCart: action,
      removeItemFromCart: action,

      servings: observable,
      addServing: action,
      removeServing: action,

      orderSum: observable,

      selectedCity: observable,
      changeSelectedCity: action,
    });
  }
}

export default ClientStore;
