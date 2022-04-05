import MainStore from '../stores/mainStore';
import OptionsStore from '../stores/optionsStore';
import ServiceStatusStore from '../stores/serviceStatusStore';
import UserStore from '../stores/userStore';
import AdminPanelStore from '../stores/adminPanelStore';
import ClientStore from '../stores/clientStore';
import RestaurantsStore from '../stores/restaurantsStore';

declare module '*.jpg';
declare module '*.png';

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

export interface Config {
  apiGateway: {
    url: string;
  };
  debug?: boolean;
  wsAddress: string;
  metricaId: number;
}

export type Stores = {
  mainStore: MainStore;
  optionsStore: OptionsStore;
  serviceStatusStore: ServiceStatusStore;
  userStore: UserStore;
  adminPanelStore: AdminPanelStore;
  clientStore: ClientStore;
  restaurantsStore: RestaurantsStore;
};

export type Color = {
  a: number;
  b: number;
  g: number;
  r: number;
};

export type Restaurant = {
  id?: string;
  name: string;
  items: string[] | undefined;
  rating: number | undefined;
  categories: string[];
  delivery: number| undefined;
  imageLocation?: string;
  locationIDs: string[];
  commentIDs: string[];
}

export type RestaurantAdmin={
  id?: string;
  name: string | undefined;
  phone: string | undefined;
  email: string| undefined;
  items: string[] | Item[] | undefined;
  imageSource: FormData | undefined;
}

export type Item = {
  id?: string;
  placeID: string;
  name: string;
  description: string;
  price: number | undefined;
  category: string;
  imageSource: string;
  discount: number | undefined;
}

export type CartItem = {
  name: string;
  quantity: number;
  price: number;
  restaurantID: string;
}

export type Order = {
  id?: string|undefined;
  name: string | undefined;
  surname: string | undefined;
  phone: string | undefined;
  address: UserAddress | undefined;
  promocode: string | undefined;
  paymentMethod: string | undefined;
  comment: comment | undefined;
  items: Map<Item, number>;
  servings: number | undefined;
  deliveryPrice: number | undefined;
  orderDate: Date | undefined;
  deliveryDate?: Date;
  orderSum: number;
  placeName: string | undefined;
  delivered?: boolean;
  city: string | undefined;
}

export type UserAddress = {
  address: string | undefined;
  flat: string | undefined;
  floor: number | undefined;
  entranceCode: string | undefined;
}

export type OrderAdmin = {
  id?: string|undefined;
  phone: string | undefined;
  email: string | undefined;
  servings: number | undefined;
  items: Map<string, number>;
  deliveryPrice?: number;
  orderSum?: number;
  orderDate?: Date;
  placeID: string | undefined;
  cityID: string | undefined;
}

export type City = {
  id?: string;
  name: string;
  places?: number;
}

export type Category = {
  id: string;
  name: string;
  iconLocation: string;
  items: number | undefined;
}

export type Client = {
  id: string;
  phone: string;
  name: string;
  email: string;
}

export type Admin = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export type userData = {
  id?: string;
  name: string;
  surname?: string;
  email: string;
  phone: string;
}

export type comment = {
  id?: string;
  name?: string;
  date?: Date;
  text: string;
  rating: number;
}