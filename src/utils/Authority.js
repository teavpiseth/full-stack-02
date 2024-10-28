import LocalStorage from "./LocalStorage";

export const Authority = {
  check: (key) => {
    // console.log(JSON.parse(LocalStorage.getRole())?.includes(key));
    // return true;
    if (LocalStorage.getRole()?.includes(key)) {
      return true;
    } else {
      return false;
    }
  },
  Employee: "Employee",
  Category: "Category",
  Product_add: "Product_add",
  Product: "Product",
  employee_add_new: "employee_add_new",
  employee_update: "employee_update",
  employee_delete: "employee_delete",
  access_key: "access_key",
  access_key_add: "access_key_add",
  access_key_update: "access_key_update",
  category_add: "category_add",
  category_update: "category_update",
  category_delete: "category_delete",
  access_key_delete: "access_key_delete",
  product_delete: "product_delete",
  product_update: "product_update",
};
