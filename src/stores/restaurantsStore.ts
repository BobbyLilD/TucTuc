import { action, makeObservable, observable } from 'mobx';
import { Item, Restaurant } from '../types';

class RestaurantsStore {
  restaurantsList: Map<string,Restaurant>;
  resultingList: Map<string,Restaurant>;
  categories: Map<string, boolean>;
  selectedCategory: string | undefined;
  searchQuery: string | undefined;
  getRestaurantsList = () => {
    const newItem: Item = {
      name: 'Удон с курицей',
      price: 450,
      discount: 30,
      description: `Вкусное и яркое блюдо азиатской кухни порадует всех! Имея дома в шкафчике удон, 
        всегда можно быстро приготовить ужин для всей семьи, 
        ведь с ингредиентами можно экспериментировать`,
      category: 'Японская',
    };

    const items = new Map();
    for(let i = 0; i < 6; i++){
        items.set(i,newItem);
    }

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

  changeCategory = (category: string) => {
    if (this.selectedCategory == category) {
      this.selectedCategory = undefined;
      this.categories[category] = false;
    } else if (this.selectedCategory == undefined){
        this.selectedCategory = category;
        this.categories[category] = true;
    }
    else {
      this.categories.forEach((value) => {
        if (value) {
          value = false;
        }
      });
      this.categories[category] = true;
      this.selectedCategory = category;
    }
  };

  filterRestaurants = () => {
    this.resultingList.clear()
    if (this.selectedCategory != undefined) {
      this.restaurantsList.forEach((value, key) => {
        if(value.categories.includes(this.selectedCategory!)){
            this.resultingList[key]=value;
        }
      })
    } else {
      this.resultingList = new Map(this.restaurantsList);
    }

    if (this.searchQuery != undefined) {
      this.resultingList.forEach((value, key) => {
          if(!value.name.includes(this.searchQuery!)){
            this.resultingList.delete(key);
          }
      })
    }
  };

  constructor() {
    this.restaurantsList = new Map();
    this.resultingList = new Map();
    this.categories = new Map();
    this.getRestaurantsList();

    makeObservable(this, {
      restaurantsList: observable,
    });
  }
}

export default RestaurantsStore;
