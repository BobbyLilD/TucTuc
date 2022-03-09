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
  rating: number;
  categories: string[];
  delivery: number;
}

export type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
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
  id: string|undefined;
  name: string | undefined;
  surname: string | undefined;
  phone: string | undefined;
  address: string | undefined;
  flat: string | undefined;
  floor: number | undefined;
  entranceCode: string | undefined;
  promocode: string | undefined;
  paymentMethod: string | undefined;
  comment: string | undefined;
  items: string[] | undefined;
  servings: string | undefined;
  deliveryPrice: string | undefined;
  date: Date | undefined;
}

export type City = {
  id: string;
  name: string;
  places: number;
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

export type Place = {
  id: string;
  name: string;
  phone: string;
  email: string;
  photoLocation: string;
}