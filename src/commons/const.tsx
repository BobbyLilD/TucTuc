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
  // Товары: ['/admin/items', itemsComponent],
  Заказы: ['/admin/orders', ordersComponent],
  Клиенты: ['/admin/clients', clientsComponent],
  Админы: ['/admin/admins', adminsComponent]
};

export const emailRegex: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
export const phoneRegex: RegExp = /((\+7)|8)?(\-|\s)?(\d){3}(\-|\s)?(((\d){7})|((\d){3})(\-|\s)?((\d){2})(\-|\s)?((\d){2}))/;
export const numbRegex: RegExp = /(\d)/g;
export const letterRegex: RegExp= /([a-z,а-я])/g;
export const dateRegex: RegExp = /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/g;