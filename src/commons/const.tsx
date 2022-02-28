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
