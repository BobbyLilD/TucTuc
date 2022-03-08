import { action, makeObservable, observable } from 'mobx';
import { Item, Restaurant } from '../types';

class RestaurantsStore {
  restaurantsList: Map<string,Restaurant>;
  resultingList: Map<string,Restaurant>;
  categories: string[];
  selectedCategories: string[] | undefined;
  searchQuery: string | undefined;

  changeSearchQuery = (query: string) => {
    this.searchQuery = query;
    console.log(this.searchQuery);
    this.filterRestaurants();
  }

  getCategories = () => {

    this.categories.push('Японская');
    this.categories.push('Итальянская');
    this.categories.push('Фаст-фуд');
    this.categories.push('Русская');
    this.categories.push('Испанская');
    this.categories.push('Французская');
    this.categories.push('Вьетнамская')

  }

  getRestaurantsList = () => {
    const newItem: Item = {
      id: 'dfknsdfnks',
      name: 'Удон с курицей',
      price: 450,
      discount: 30,
      description: `Вкусное и яркое блюдо азиатской кухни порадует всех! Имея дома в шкафчике удон, 
        всегда можно быстро приготовить ужин для всей семьи`,
      category: 'Японская',
    };

    const items = [newItem, newItem, newItem, newItem];

    const newRest: Restaurant = {
      name: 'Sushi Wok',
      items: items,
      rating: 4.2,
      categories: ['Японская', 'Итальянская', 'Японская', 'Итальянская'],
      delivery: 800,
    };
    for (let i = 0; i < 7; i++) {
      this.restaurantsList.set(i.toString(),newRest);

    }
    this.resultingList = new Map(this.restaurantsList);
  };

  selectCategories = (categories: string[]) => {
    this.selectedCategories = new Array(...categories);
    console.log(this.selectedCategories);
    this.filterRestaurants();
  }


  filterRestaurants = () => {
    this.resultingList = new Map();
    if (this.selectedCategories != undefined && this.selectedCategories.length > 0) {
      this.restaurantsList.forEach((value, key) => {
        let inter = this.selectedCategories!.filter(x => value.categories.includes(x));
        if(inter.length > 0){
            this.resultingList.set(key, value);
        }
      })
    } else {
      this.resultingList = new Map(this.restaurantsList);
    }

    if (this.searchQuery != undefined && this.searchQuery!='') {
      this.resultingList.forEach((value, key) => {
          if(!value.name.toLocaleLowerCase().includes(this.searchQuery!.toLowerCase())){
            this.resultingList.delete(key);
          }
      })
    }
    console.log(this.resultingList.size)
  };

  constructor() {
    this.restaurantsList = new Map();
    this.resultingList = new Map();
    this.categories = [];
    this.getRestaurantsList();
    this.getCategories();
    this.searchQuery = '';
    this.selectedCategories = new Array();

    makeObservable(this, {
      restaurantsList: observable,

      categories: observable,
      selectCategories: action,
      selectedCategories: observable,

      resultingList: observable,
      filterRestaurants: action,

      searchQuery: observable,
      changeSearchQuery: action
    });
  }
}

export default RestaurantsStore;
