import citiesComponent from "../components/admin/cities";
import adminsComponent from '../components/admin/admins';
import placesComponent from '../components/admin/places';
import categoriesComponent from '../components/admin/categories';
import itemsComponent from '../components/admin/items';
import ordersComponent from '../components/admin/orders';
import clientsComponent from '../components/admin/clients';

export const Modules = {
  Docs: ['/documents', '/documents/editor'],
};

export const AdminComponents = {
  Города: ['/admin/cities', citiesComponent],
  Заведения: ['/admin/places', placesComponent],
  'Категории товаров': ['/admin/categories', categoriesComponent],
  Товары: ['/admin/items', itemsComponent],
  Заказы: ['/admin/orders', ordersComponent],
  Клиенты: ['/admin/clients', clientsComponent],
  Админы: ['/admin/admins', adminsComponent]
};

export const emailRegex: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
export const phoneRegex: RegExp = /((\+7)|8)?(\-|\s)?(\d){3}(\-|\s)?(((\d){7})|((\d){3})(\-|\s)?((\d){2})(\-|\s)?((\d){2}))/;
export const numbRegex: RegExp = /(\d)/g;
export const letterRegex: RegExp= /([a-z,а-я])/g;