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
  name: string;
  items: Map<string,Item> | undefined;
  rating: number;
  categories: string[];
  delivery: number;
}

export type Item = {
  name: string;
  description: string;
  price: number;
  category: string;
  discount: number | undefined;
}

export type CartItem = {
  name: string;
  quantity: number;
  price: number;
  restaurantID: string;
}