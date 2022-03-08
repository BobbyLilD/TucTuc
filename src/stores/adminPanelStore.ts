import { action, makeObservable, observable } from 'mobx';
import { Admin, Category, City, Client, Item, Order, Place } from '../types';

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
  ordersList: Order[] | undefined;
  placesList: Place[] | undefined;
  adminsList: Admin[] | undefined;

  getCities = () => {
    const newCity : City = {id:'snsnlsd', name: 'Санкт-Петербург', places: 20}
    let newList = [newCity, newCity,newCity, newCity];
    this.citiesList = new Array(...newList);
  };

  getAdmins = () => {
    const newAdmin: Admin = {id: 'dfkbdfkj', name: 'Иван', surname: "Петров", phone: '+79169263520', email:'petrov@gmail.com'}
    let newList = [newAdmin, newAdmin, newAdmin];
    this.adminsList = new Array(...newList);
  };

  getCategories = () => {
    const newCategory: Category = {id: 'vskllsd', name:'Японская', iconLocation: 'abc', items: 420}
    let newList: Category[] = [newCategory, newCategory, newCategory, newCategory]
    this.categoriesList = new Array(...newList)
  }

  getItems = () => {
    const newItem: Item = {id:'sbdjsdbg', name: 'Удон с курицей', description: 'dbgdfgdfjdfg', price: 124034, category: 'Японская', discount: 30}
  }

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
    this.adminsList = new Array;
    this.cityAdd = false;
    this.adminAdd = false;
    this.placeAdd = false;
    this.itemAddToPlace = false;
    this.photoSet = false;
    this.categoryAdd = false;
    this.orderAdd = false;
    this.clientEdit = false;

    makeObservable(this, {
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

      citiesList: observable,
      getCities: action,

      adminsList: observable,
      getAdmins: action,
    });
  }
}

export default AdminPanelStore;
