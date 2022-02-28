import { action, makeObservable, observable } from 'mobx';

class AdminPanelStore {
  cityAdd: boolean;
  changeCityAdd = () => {
    this.cityAdd = !this.cityAdd;
  };

  adminAdd: boolean;
  changeAdminAdd = () => {
    this.adminAdd = !this.adminAdd;
  };

  placeAdd: boolean;
  itemAddToPlace: boolean;
  photoSet: boolean;
  changePlaceAdd = () => {
    this.placeAdd = !this.placeAdd;
  };
  changeItemAdd = () => {
    this.itemAddToPlace = !this.itemAddToPlace;
  };
  changePhotoSet = () => {
    this.photoSet = !this.photoSet;
  };

  categoryAdd: boolean;
  changeCategoryAdd = () => {
    this.categoryAdd = !this.categoryAdd;
  };

  orderAdd: boolean;
  changeOrderAdd = () => {
    this.orderAdd = !this.orderAdd;
  }

  clientEdit: boolean;
  changeClientAdd = () => {
    this.clientEdit =!this.clientEdit;
  }

  constructor() {
    this.cityAdd = false;
    this.adminAdd = false;
    this.placeAdd = false;
    this.itemAddToPlace = false;
    this.photoSet = false;
    this.categoryAdd = false;
    this.orderAdd = false;
    this.clientEdit = false;

    makeObservable(this, {
      cityAdd: observable,
      changeCityAdd: action,

      adminAdd: observable,
      changeAdminAdd: action,

      placeAdd: observable,
      changePlaceAdd: action,

      itemAddToPlace: observable,
      changeItemAdd: action,

      photoSet: observable,
      changePhotoSet: action,

      categoryAdd: observable,
      changeCategoryAdd: action,

      orderAdd: observable,
      changeOrderAdd: action,

      clientEdit: observable,
      changeClientAdd:  action,
    });
  }
}

export default AdminPanelStore;
