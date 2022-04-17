import { action, makeObservable, observable } from 'mobx';
import { CartItem, comment, Item, locationRecord, Order, Restaurant } from '../types';

class ClientStore {
  showCart: boolean;
  showOrderList: boolean;
  showInfoForm: boolean;
  showCommentForm: boolean;

  cart: Map<string, CartItem>;
  newOrder: Order | undefined;
  orderList: Order[] | undefined;
  selectedCity: string;
  selectedComment: comment | undefined;
  locationRecordsList: locationRecord[] | undefined;

  setLocationInOrder = (id: string) => {
    this.newOrder!.locationID = id;
  };

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

  getLocationRecordsByID = (id: string) => {
    let newRecord: locationRecord = {
      id: 'shflsdfhlsdf',
      address: 'Москва, Колотушкина, 35',
    };
    const newArr = [newRecord, newRecord, newRecord];
    this.locationRecordsList = new Array(...newArr);
  };

  getOrderList = () => {
    const newItem: Item = {
      id: 'dfknsdfnks',
      placeID: '21312',
      name: 'Удон с курицей',
      price: 450,
      discount: { percentage: 30 },
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
      address: { city: 'Moscow', address: 'Moscow', flat: '50', floor: 9, entranceCode: '50' },
      paymentMethod: undefined,
      comment: { id: 'sfhsjfks', text: 'dlhdshkhsdfhsf', rating: 3 },
      items: itemsList,
      servings: 4,
      deliveryPrice: 20,
      deliveryDate: new Date('2017-02-03'),
      orderSum: 53453,
      delivered: true,
      placeInfo: { id: 'kdflkdflgd' },
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
      discount: { percentage: 30 },
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
      address: {
        city: 'Moscow',
        address: 'Kolotushkina',
        flat: '50',
        floor: 9,
        entranceCode: '50',
      },
      paymentMethod: undefined,
      comment: { id: 'sfhsjfks', text: 'dlhdshkhsdfhsf', rating: 3 },
      items: itemsList,
      servings: 4,
      deliveryPrice: 20,
      deliveryDate: new Date('2017-02-03'),
      orderSum: 53453,
      placeInfo: { id: 'djglkjgfd', name: 'McBoba' },
      delivered: true,
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
      };
      this.cart.set(id, newItem);
    } else {
      if (restaurantID != this.newOrder?.placeInfo?.id) {
        this.cart.clear();
        this.newOrder!.placeInfo!.id = restaurantID;
        this.getLocationRecordsByID(restaurantID);
        console.log('place set');
      }
      this.cart.set(id, { name: name, quantity: 1, price: price });
    }
    this.newOrder!.orderSum += price;
    console.log(id);
    console.log(this.cart.get(id)!.quantity);
  };
  removeItemFromCart = (id: string) => {
    this.newOrder!.orderSum -= this.cart.get(id)!.price;
    if (this.cart.get(id)!.quantity > 1) {
      let newItem: CartItem = {
        name: this.cart.get(id)!.name,
        quantity: this.cart.get(id)!.quantity - 1,
        price: this.cart.get(id)!.price,
      };
      this.cart.set(id, newItem);
    } else if (this.cart.get(id)!.quantity == 1) {
      this.cart.delete(id);
    }
  };

  addServing = () => {
    this.newOrder!.servings!++;
  };

  removeServing = () => {
    this.newOrder!.servings!--;
  };

  initNewOrder = () => {
    this.newOrder = {
      id: undefined,
      address: undefined,
      paymentMethod: undefined,
      comment: undefined,
      items: new Map(),
      servings: 1,
      deliveryPrice: 500,
      orderSum: 500,
      placeInfo: { id: '' },
      delivered: false,
      locationID: undefined,
    };
    console.log('order init');
  };

  constructor() {
    this.selectedCity = 'None';
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

      newOrder: observable,
      initNewOrder: action,
      setLocationInOrder: action,
      addServing: action,
      removeServing: action,
      selectedCity: observable,
      changeSelectedCity: action,

      locationRecordsList: observable,
      getLocationRecordsByID: action,
    });
  }
}

export default ClientStore;
