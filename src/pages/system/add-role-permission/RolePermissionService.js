import { BaseService } from "src/services";

const ApiUrl = {
  getList: "/access-key/get-list/group",
  getListRoleAccess: "/role-access/get-list?",
  update: "/role-access/update",
  delete: "/access-key/delete",
};

class RolePermissionService {
  async fetchList(param) {
    const response = await BaseService.get(ApiUrl.getList + param);
    return response;
  }

  async fetchListRoleAccess(param) {
    const response = await BaseService.get(ApiUrl.getListRoleAccess + param);
    return response;
  }

  async update(values) {
    const response = await BaseService.post(ApiUrl.update, values);
    return response;
  }

  async delete(id) {
    const response = await BaseService.delete(ApiUrl.delete, { id });
    return response;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new RolePermissionService();
