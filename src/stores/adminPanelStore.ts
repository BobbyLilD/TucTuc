import { action, makeObservable, observable } from 'mobx';
import { Admin, Category, City, Client, Item, OrderAdmin, RestaurantAdmin } from '../types';

class AdminPanelStore {
  cityAdd: boolean;
  placeAdd: boolean;
  itemAddToPlace: boolean;
  photoSet: boolean;
  adminAdd: boolean;
  categoryAdd: boolean;
  orderAdd: boolean;
  clientEdit: boolean;

  citiesList: City[] | undefined;
  itemsList: Item[] | undefined;
  categoriesList: Category[] | undefined;
  clientsList: Client[] | undefined;
  ordersList: OrderAdmin[] | undefined;
  placesList: RestaurantAdmin[] | undefined;
  adminsList: Admin[] | undefined;

  selectedItem: number | undefined;
  selectedFoodItem: number | undefined;

  newPlace: RestaurantAdmin | undefined;
  newOrder: OrderAdmin | undefined;
  itemsInOrder: Map<string, Item> | undefined;
  itemsInPlace: Map<string, Item> | undefined;

  selectOrderCity = (id: string) => {
    this.newOrder!.cityID = id;
  };

  selectOrderPlace = (id: string) => {
    this.newOrder!.placeID = id;
  };

  addItemToOrder = (id: string, item?: Item) => {
    if (this.newOrder?.items.get(id) == undefined) {
      this.newOrder?.items.set(id, 1);
      this.itemsInOrder?.set(id, item!);
    } else {
      this.newOrder.items.set(id, this.newOrder.items.get(id)! + 1);
    }
    console.log('map size is ' + this.itemsInOrder?.size);
    console.log('item quantity' + this.newOrder?.items.get(id));
  };

  removeItemFromOrder = (id: string) => {
    if (this.newOrder?.items.get(id) != undefined) {
      if (this.newOrder.items.get(id) == 0) {
        this.newOrder.items.delete(id);
      } else {
        this.newOrder.items.set(id, this.newOrder.items.get(id)! - 1);
      }
    }
  };

  deleteItemFromOrder = (id: string) => {
    if (this.newOrder?.items.get(id) != undefined) {
      this.newOrder.items.delete(id);
      this.itemsInOrder?.delete(id);
    }
  };

  changeSelectedItem = (index: number) => {
    this.selectedItem = index;
  };

  changeSelectedFoodItem = (index: number) => {
    this.selectedFoodItem = index;
  }

  //INITTERS
  initPlace = () => {
    this.newPlace = {
      name: '',
      phone: '',
      email: '',
      items: new Array(),
      imageSource: undefined,
    };
  };

  initOrder = () => {
    this.newOrder = {
      phone: undefined,
      email: undefined,
      items: new Map(),
      servings: undefined,
      cityID: '',
      placeID: '',
    };
    this.itemsInOrder = new Map();
  };

  //GETTERS

  getRestaurantByID = (id: string) => {
    let newPlace: RestaurantAdmin = {
      id: '0',
      name: 'mcBoba',
      phone: '4957647564886',
      email: 'mcboba@gmail.com',
      items: undefined,
      imageSource: undefined,
    };
    this.placesList = new Array(...[newPlace]);
  };

  getPlaces = () => {
    let newPlace: RestaurantAdmin = {
      id: '0',
      name: 'mcBoba',
      phone: '4957647564886',
      email: 'mcboba@gmail.com',
      items: new Array(),
      imageSource: undefined,
    };
    let newArray: RestaurantAdmin[] = [newPlace, newPlace, newPlace, newPlace, newPlace];
    this.placesList = new Array(...newArray);
  };

  getItemsByIDs = (IDs: string[]) => {
    const newItem: Item = {
      id: 'sbdjsdbg',
      name: 'Удон с курицей',
      description: 'dbgdfgdfjdfg',
      price: 124034,
      category: 'Японская',
      discount: 30,
      imageSource: 'kndlfngd',
      placeID: 'kndklfng',
    };
    let newList: Map<string, Item> = new Map();
    newList.set(newItem.id!, newItem);
    this.itemsInOrder = new Map(newList);
  };

  getItemsByPlaceID = (id: string) => {
    const newItem: Item = {
      id: 'sbdjsdbg',
      name: 'Удон с курицей',
      description: 'dbgdfgdfjdfg',
      price: 124034,
      category: 'Японская',
      discount: 30,
      imageSource: 'kndlfngd',
      placeID: 'kndklfng',
    };
    let newList: Item[] = [newItem, newItem, newItem, newItem];
    this.itemsList = new Array(...newList);
  };

  getCities = () => {
    this.citiesList = new Array();
    const newCity: City = { id: '0', name: 'Санкт-Петербург', places: 20 };
    let newList = [newCity, newCity, newCity, newCity];
    this.citiesList = new Array(...newList);
  };

  getAdmins = () => {
    const newAdmin: Admin = {
      id: 'dfkbdfkj',
      name: 'Иван',
      surname: 'Петров',
      phone: '+79169263520',
      email: 'petrov@gmail.com',
    };
    let newList = [newAdmin, newAdmin, newAdmin];
    this.adminsList = new Array(...newList);
  };

  getCategories = () => {
    const newCategory: Category = {
      id: 'vskllsd',
      name: 'Японская',
      iconLocation: 'abc',
      items: 420,
    };
    let newList: Category[] = [newCategory, newCategory, newCategory, newCategory];
    this.categoriesList = new Array(...newList);
  };

  getItems = () => {
    const newItem: Item = {
      id: 'sbdjsdbg',
      name: 'Удон с курицей',
      description: 'dbgdfgdfjdfg',
      price: 124034,
      category: 'Японская',
      discount: 30,
      imageSource: 'kndlfngd',
      placeID: 'kndklfng',
    };
    let newList: Item[] = [newItem, newItem, newItem, newItem];
    this.itemsList = new Array(...newList);
  };

  getClients = () => {
    const newItem: Client = {
      id: 'fkndndlf',
      name: 'Иван',
      phone: '791676473634',
      email: 'ivanov@gmail.com',
    };

    let newList: Client[] = [newItem, newItem, newItem, newItem];
    this.clientsList = new Array(...newList);
  };

  getOrders = () => {
    const newItem: OrderAdmin = {
      id: 'ddnndfnld',
      phone: '+79162963580',
      items: new Map(),
      servings: 22,
      deliveryPrice: 656,
      orderDate: new Date('2017-04-03'),
      orderSum: 1200,
      email: 'mcboba@gmail.com',
      placeID: '0',
      cityID: '0',
    };
    let newList: OrderAdmin[] = [newItem, newItem, newItem, newItem];
    this.ordersList = new Array(...newList);
  };

  //FORM MARKERS

  changeCityAdd = () => {
    this.cityAdd = !this.cityAdd;
  };

  changeAdminAdd = () => {
    this.adminAdd = !this.adminAdd;
  };

  changePlaceAdd = () => {
    this.placeAdd = !this.placeAdd;
  };
  changeItemAdd = () => {
    this.itemAddToPlace = !this.itemAddToPlace;
  };
  changePhotoSet = () => {
    this.photoSet = !this.photoSet;
  };

  changeCategoryAdd = () => {
    this.categoryAdd = !this.categoryAdd;
  };

  changeOrderAdd = () => {
    this.orderAdd = !this.orderAdd;
  };

  changeClientAdd = () => {
    this.clientEdit = !this.clientEdit;
  };

  constructor() {
    this.adminsList = new Array();
    this.cityAdd = false;
    this.adminAdd = false;
    this.placeAdd = false;
    this.itemAddToPlace = false;
    this.photoSet = false;
    this.categoryAdd = false;
    this.orderAdd = false;
    this.clientEdit = false;

    makeObservable(this, {
      //FORM MARKERS
      cityAdd: observable,
      changeCityAdd: action,

      adminAdd: observable,
      changeAdminAdd: action,

      placeAdd: observable,
      changePlaceAdd: action,

      itemAddToPlace: observable,
      changeItemAdd: action,

      photoSet: observable,
      changePhotoSet: action,

      categoryAdd: observable,
      changeCategoryAdd: action,

      orderAdd: observable,
      changeOrderAdd: action,

      clientEdit: observable,
      changeClientAdd: action,

      //LIST INIT
      citiesList: observable,
      getCities: action,

      adminsList: observable,
      getAdmins: action,

      itemsList: observable,
      getItems: action,
      getItemsByPlaceID: action,
      getItemsByIDs: action,

      ordersList: observable,
      getOrders: action,

      clientsList: observable,
      getClients: action,

      placesList: observable,
      getPlaces: action,

      selectedItem: observable,
      changeSelectedItem: action,

      //FORMS
      newOrder: observable,
      itemsInOrder: observable,
      addItemToOrder: action,
      removeItemFromOrder: action,
      initOrder: action,
      deleteItemFromOrder: action,
      selectOrderCity: action,
      selectOrderPlace: action,

      newPlace: observable,
      initPlace: action,
      itemsInPlace: observable,

      selectedFoodItem: observable,
      changeSelectedFoodItem: action,

    });
  }
}

export default AdminPanelStore;
