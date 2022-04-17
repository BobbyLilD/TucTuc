import { action, makeObservable, observable } from 'mobx';
import { Category, City, comment, Item, locationRecord, Restaurant } from '../types';

class RestaurantsStore {
  restaurantsList: Map<string,Restaurant>;
  categories: Category[];
  itemsList: Item[] | undefined;
  selectedCategories: string[] | undefined;
  searchQuery: string | undefined;
  selectedRestaurant: Restaurant| undefined;
  cities: Map<string, City> | undefined;

  showCommentList: boolean;
  commentList: comment[];

  changeCommentListShow = () => {
    this.showCommentList = !this.showCommentList
  }

  getCommentsByPlaceID = (id: string) => {
    let newComment: comment = {
      id: 'kajbskakd',
      name: 'Иван',
      date: new Date('2017-02-02'),
      text: 'fhsdfhkshfkshfksdffhsdfhkshfkshfksdffhsdfhkshfkshfksdffhsdfhkshfkshfksdffhsdfhkshfkshfksdffhsdfhkshfkshfksdf',
      rating: 3.5,
    };
    let newArray: comment[] = [newComment, newComment, newComment, newComment];
    this.commentList = new Array(...newArray);
  };

  getCities = () => {
    this.cities = new Map();
    this.cities.set('lnfnlssdf', {name: 'Москва'})
    this.cities.set('jhgjkkf', {name: 'Санкт-Петербург'})
    this.cities.set('jffhdhdh', {name: 'Омск'})
  }

  changeSearchQuery = (query: string) => {
    this.searchQuery = query;
    console.log(this.searchQuery);
    this.filterRestaurants();
  }

  getCategories = () => {
    this.categories = new Array();

    this.categories.push({id:'jdfd',name:'Японская', iconLocation: 'dnfkdf', items: undefined});
    this.categories.push({id:'jdffd',name:'Итальянская', iconLocation: 'dnfkdf', items: undefined});
    this.categories.push({id:'jdcfd',name:'Французская', iconLocation: 'dnfkdf', items: undefined});
    this.categories.push({id:'jdbfd',name:'Китайская', iconLocation: 'dnfkdf', items: undefined});
    this.categories.push({id:'jdfqd',name:'Русская', iconLocation: 'dnfkdf', items: undefined});
    this.categories.push({id:'jdtfd',name:'Украинская', iconLocation: 'dnfkdf', items: undefined});
    this.categories.push({id:'jdyfd',name:'Испанская', iconLocation: 'dnfkdf', items: undefined});

  }

  getItems = () => {
    const newItem: Item = {
      id: 'dfknsdfnks',
      placeID: '21312',
      name: 'Удон с курицей',
      price: 450,
      discount: {percentage: 30},
      description: `Вкусное и яркое блюдо азиатской кухни порадует всех! Имея дома в шкафчике удон, 
        всегда можно быстро приготовить ужин для всей семьи`,
      category: 'Японская',
      imageSource: 'ndfngdfngd'
    };

    const items = [newItem, newItem, newItem, newItem];
    this.itemsList = new Array(...items);
  }

  getRestaurantByID = (id: string) => {
    this.selectedRestaurant = undefined;
    const newRest: Restaurant = {
      id: 'lddffgd',
      name: 'Sushi Wok',
      rating: 4.2,
      categories: ['Японская', 'Итальянская', 'Японская', 'Итальянская'],
      delivery: 800,
      items: ['0','1','2','3'],
      locationIDs: new Array(),
      commentIDs: new Array(),
    };
    this.selectedRestaurant = newRest;
  }

  getRestaurantsList = () => {
    this.restaurantsList = new Map();
    const newRest: Restaurant = {
      name: 'Sushi Wok',
      rating: 4.2,
      categories: ['Японская', 'Итальянская', 'Японская', 'Итальянская'],
      delivery: 800,
      items: ['0','1','2','3'],
      locationIDs: new Array(),
      commentIDs: new Array(),
    };
    for (let i = 0; i < 7; i++) {
      this.restaurantsList.set(i.toString(),newRest);
    }
    console.log('done')
  };

  selectCategories = (categories: string[]) => {
    this.selectedCategories = new Array(...categories);
    console.log(this.selectedCategories);
    this.filterRestaurants();
  }


  filterRestaurants = () => {
    // this.resultingList = new Map();
    // if (this.selectedCategories != undefined && this.selectedCategories.length > 0) {
    //   this.restaurantsList.forEach((value, key) => {
    //     let inter = this.selectedCategories!.filter(x => value.categories.includes(x));
    //     if(inter.length > 0){
    //         this.resultingList.set(key, value);
    //     }
    //   })
    // } else {
    //   this.resultingList = new Map(this.restaurantsList);
    // }

    // if (this.searchQuery != undefined && this.searchQuery!='') {
    //   this.resultingList.forEach((value, key) => {
    //       if(!value.name.toLocaleLowerCase().includes(this.searchQuery!.toLowerCase())){
    //         this.resultingList.delete(key);
    //       }
    //   })
    // }
    // console.log(this.resultingList.size)
  };

  constructor() {
    this.itemsList = new Array();
    this.commentList = new Array();
    this.restaurantsList = new Map();
    this.categories = [];
    this.searchQuery = '';
    this.selectedCategories = new Array();
    this.showCommentList = false;

    makeObservable(this, {
      restaurantsList: observable,
      selectedRestaurant: observable,
      getRestaurantsList: action,
      getRestaurantByID: action,

      categories: observable,
      selectCategories: action,
      selectedCategories: observable,
      getCategories: action,

      filterRestaurants: action,

      searchQuery: observable,
      changeSearchQuery: action,

      itemsList: observable,
      getItems: action,

      cities: observable,
      getCities: action,

      showCommentList: observable,
      changeCommentListShow: action,

      commentList: observable,
      getCommentsByPlaceID: action,
      
    });
  }
}

export default RestaurantsStore;
