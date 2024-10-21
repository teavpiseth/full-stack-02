import  BaseService  from "../../../services/BaseService";

const ApiUrl = {
  getList: "http://localhost:8081/api/access-key/get-list?",
  addNew: "http://localhost:8081/api/access-key/create",
  update: "http://localhost:8081/api/access-key/update",
  delete: "http://localhost:8081/api/access-key/delete",
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

export default new AccessKeyService();
