import  BaseService  from "../../../services/BaseService";

const ApiUrl = {
  getList: "/access-key/get-list?",
  addNew: "/access-key/create",
  update: "/access-key/update",
  delete: "/access-key/delete",
};

class AccessKeyService {
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

// eslint-disable-next-line import/no-anonymous-default-export
export default new AccessKeyService();
