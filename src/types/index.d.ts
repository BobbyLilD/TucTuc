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
  items: string[] | undefined;
  imageSource: File | undefined;
  locationRecords: locationRecord[];
}

export type NewRestaurantEntityAdmin={
  id?: string;
  name: string | undefined;
  phone: string | undefined;
  email: string| undefined;
  items: Item[];
  imageSource: File | undefined;
  locationRecords: locationRecord[];
}

export type Item = {
  id?: string;
  placeID?: string;
  name: string;
  description: string;
  price: number | undefined;
  category: string;
  imageSource: string;
  discount?: Promo;
}

export type CartItem = {
  name: string;
  quantity: number;
  price: number;
}

export type Order = {
  id?: string|undefined;
  address: Address;
  paymentMethod: string | undefined;
  comment: comment | undefined;
  items: Map<Item, number>;
  servings: number | undefined;
  deliveryPrice: number | undefined;
  deliveryDate?: Date;
  orderSum: number;
  delivered?: boolean;
  placeInfo: PlaceInfo | undefined;
  locationID?: string;
}

export type PlaceInfo = {
  id: string;
  name?: string;
  phome?: string;
  imageSource?: string;
}

export type Address = {
  city: string;
  street: string;
  house: string;
  entrance: string;
  floor: string;
  apartment: string;
  intercom: string;
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
  placeID: string;
  placeAddress: string | undefined;
  locationrecordID: string | undefined;
  destAddress: Address;
  status: string | undefined;
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

export type locationRecord = {
  id?: string;
  address: string;
}

export type Promo = {
  id?: string;
  percentage: number;
  expirationDate?: string;
}