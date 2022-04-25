import { action, makeObservable, observable } from 'mobx';
import {
  Admin,
  Category,
  City,
  Client,
  Item,
  locationRecord,
  NewRestaurantEntityAdmin,
  OrderAdmin,
  RestaurantAdmin,
} from '../types';

class AdminPanelStore {
  cityAdd: boolean = false;
  placeAdd: boolean = false;
  itemAddToPlace: boolean = false;
  photoSet: boolean = false;
  adminAdd: boolean = false;
  categoryAdd: boolean = false;
  orderAdd: boolean = false;
  clientEdit: boolean = false;
  addAdminToPlace: boolean = false;

  citiesList: City[] | undefined;
  itemsList: Item[];
  categoriesList: Category[] | undefined;
  clientsList: Client[] | undefined;
  ordersList: OrderAdmin[] | undefined;
  placesList: RestaurantAdmin[] | undefined;
  adminsList: Admin[] | undefined;
  locationrecordsList: locationRecord[] | undefined;

  selectedItem: number | undefined;
  selectedFoodItem: number | undefined;

  newPlace: NewRestaurantEntityAdmin | undefined;
  newOrder: OrderAdmin | undefined;
  itemsInOrder: Map<string, Item> | undefined;
  itemsInPlace: Map<string, Item> | undefined;

  clearSelectedItemAndFormsStatus = () => {
    this.cityAdd = false;
    this.placeAdd = false;
    this.itemAddToPlace = false;
    this.photoSet = false;
    this.adminAdd = false;
    this.categoryAdd = false;
    this.orderAdd = false;
    this.clientEdit = false;
    this.addAdminToPlace = false;
    this.selectedItem = undefined;
  };

  changeSelectedOrder = (index: number) => {
      this.newOrder = this.ordersList![index];
      this.getItemsByIDs(Array.from(this.newOrder.items.keys()));
  };

  clearItemsInOrder = () => {
    this.itemsInOrder = new Map();
  };

  postAdminToPlace = (id: string) => {};

  deleteLocationRecord = (index: number) => {
    this.newPlace?.locationRecords.splice(index, 1);
  };

  saveChangesToLocationRecord = (data: locationRecord, index: number) => {
    this.newPlace!.locationRecords[index] = data;
    console.log(this.newPlace?.locationRecords[index].address);
  };

  addLocationRecordToNewPlace = () => {
    this.newPlace?.locationRecords.push({ address: '' });
    console.log(this.newPlace?.locationRecords.length);
  };

  selectOrderPlace = (id: string) => {
    this.newOrder!.placeID = id;
    this.getLocationRecordsByIDForOrder(id);
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

  changeSelectedPlaceItem = (index: number) => {
    const { items, ...rest } = this.placesList![index];
    this.newPlace = { items: this.itemsList, ...rest };
    this.getItemsByPlaceIDForPlaceForm(this.newPlace.id!);
  };

  changeSelectedFoodItem = (index: number) => {
    this.selectedFoodItem = index;
  };

  //INITTERS
  createRecordList = (): locationRecord[] => {
    let Item: locationRecord = {
      address: 'jdljgdfgjdfdg',
    };
    let newList = [Item, Item, Item];
    return newList;
  };

  initPlace = () => {
    this.newPlace = {
      name: '',
      phone: '',
      email: '',
      items: new Array(),
      imageSource: undefined,
      locationRecords: new Array(),
    };
    console.log('place init');
  };

  initOrder = () => {
    this.newOrder = {
      phone: undefined,
      email: undefined,
      items: new Map<string, number>(),
      servings: undefined,
      locationrecordID: '',
      placeID: '',
      destAddress: {
        city: 'Москва',
        street: 'Колотушкина',
        house: '25A',
        entrance: '3',
        floor: '4',
        apartment: '42',
        intercom: '42',
      },
      status: '',
      placeAddress: '',
    };
    this.itemsInOrder = new Map();
  };

  //GETTERS
  getAdminByPhone = (phone: string) => {
    let newAdmin: Admin = {
      id: 'dlf',
      name: 'Bob',
      surname: 'Ross',
      phone: '34573975493',
      email: 'bobross@gmail.com',
    };
    this.adminsList = new Array(newAdmin);
  };

  getLocationRecordsByIDForOrder = (id: string) => {
    this.locationrecordsList = this.createRecordList();
  };

  getLocationRecordsByID = (id: string) => {
    this.newPlace!.locationRecords = this.createRecordList();
    console.log('records added');
  };

  getRestaurantByID = (id: string) => {
    let newPlace: RestaurantAdmin = {
      id: '0',
      name: 'mcBoba',
      phone: '4957647564886',
      email: 'mcboba@gmail.com',
      items: new Array(),
      imageSource: undefined,
      locationRecords: new Array(),
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
      locationRecords: new Array({id: 'fsjfsdfs', address: 'shskjdfs' }, {id: 'jflsdfls', address: 'khsdfskdjf' }),
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
      discount: { percentage: 30, expirationDate: '01.02.2017' },
      imageSource: 'kndlfngd',
      placeID: 'kndklfng',
    };
    let newList: Map<string, Item> = new Map();
    newList.set(newItem.id!, newItem);
    this.itemsInOrder = new Map(newList);
    console.table(this.newOrder);
  };

  getItemsByPlaceIDForOrderForm = (id: string) => {
    const newItem: Item = {
      id: 'sbdjsdbg',
      name: 'Удон с курицей',
      description: 'dbgdfgdfjdfg',
      price: 124034,
      category: 'Японская',
      discount: { percentage: 30, expirationDate: '01.02.2017' },
      imageSource: 'kndlfngd',
      placeID: 'kndklfng',
    };
    let newList: Item[] = [newItem, newItem, newItem, newItem];
    this.itemsList = new Array(...newList);
  };

  getItemsByPlaceIDForPlaceForm = (id: string) => {
    const newItem: Item = {
      id: 'sbdjsdbg',
      name: 'Удон с курицей',
      description: 'dbgdfgdfjdfg',
      price: 124034,
      category: 'Японская',
      discount: { percentage: 30, expirationDate: '01.02.2017' },
      imageSource: 'kndlfngd',
      placeID: 'kndklfng',
    };
    let newList: Item[] = [newItem, newItem, newItem, newItem];
    this.newPlace!.items = new Array(...newList);
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
      discount: { percentage: 30 },
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
    let newMap = new Map<string, number>();
    newMap.set('sbdjsdbg', 2);
    const newItem: OrderAdmin = {
      id: 'ddnndfnld',
      phone: '+79162963580',
      items: new Map(newMap),
      servings: 22,
      deliveryPrice: 656,
      orderDate: new Date('2017-04-03'),
      orderSum: 1200,
      email: 'mcboba@gmail.com',
      placeID: '0',
      locationrecordID: '0',
      destAddress: {
        city: 'Москва',
        street: 'Колотушкина',
        house: '25A',
        entrance: '3',
        floor: '4',
        apartment: '42',
        intercom: '42',
      },
      status: 'Завершен',
      placeAddress: 'Москва, Колотушкина, 358',
    };
    let newList: OrderAdmin[] = [newItem, newItem, newItem, newItem];
    this.ordersList = new Array(...newList);
  };

  //FORM MARKERS

  changeAddAdminToPlace = () => {
    this.addAdminToPlace = !this.addAdminToPlace;
  };

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
    this.itemsList = new Array();

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

      addAdminToPlace: observable,
      changeAddAdminToPlace: action,

      clearSelectedItemAndFormsStatus: action,

      //LIST INIT
      citiesList: observable,
      getCities: action,

      adminsList: observable,
      getAdmins: action,

      itemsList: observable,
      getItems: action,
      getItemsByPlaceIDForPlaceForm: action,
      getItemsByPlaceIDForOrderForm: action,
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
      selectOrderPlace: action,
      clearItemsInOrder: action,
      changeSelectedOrder: action,

      newPlace: observable,
      initPlace: action,
      itemsInPlace: observable,
      addLocationRecordToNewPlace: action,
      saveChangesToLocationRecord: action,
      changeSelectedPlaceItem: action,
      deleteLocationRecord: action,

      selectedFoodItem: observable,
      changeSelectedFoodItem: action,
    });
  }
}

export default AdminPanelStore;
