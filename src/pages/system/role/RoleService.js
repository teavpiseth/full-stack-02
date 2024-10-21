import { BaseService } from "src/services";

const ApiUrl = {
  getList: "/role/get-list?",
  addNew: "/role/create",
  update: "/role/update",
  delete: "/role/delete",
};

class RoleService {
  async fetchList(param) {
    const response = await BaseService.get(ApiUrl.getList + param);
    return response;
  }

  async addNew(value) {
    const response = await BaseService.post(ApiUrl.addNew, value);
    return response;
  }

  async update(values) {
    const response = await BaseService.put(ApiUrl.update, values);
    return response;
  }

  async delete(id) {
    const response = await BaseService.delete(ApiUrl.delete, { id });
    return response;
  }
}


export default new RoleService();
