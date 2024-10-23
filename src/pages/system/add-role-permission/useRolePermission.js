// import RoleService from "../role/RoleService";

import { Form } from "antd";
import { useEffect, useState } from "react";
import BaseService from "../../../services/BaseService";
import { useLocation } from "react-router-dom";

function useRolePermission() {
  const location = useLocation();

  // Function to parse query parameters
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();
  const paramId = query.get("id"); // Get specific query parameter
  const paramName = query.get("name"); // Another parameter

  console.log(paramId, paramName);

  const [activeKey, setActiveKey] = useState([""]);

  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [checked, setChecked] = useState({});
  const [roleList, setRoleList] = useState([]);
  async function submitHandle() {
    const add = [];
    const remove = [];
    for (const key in checked) {
      if (checked[key]) {
        add.push(key);
      } else {
        remove.push(key);
      }
    }
    const result = await BaseService.post(
      "http://localhost:8081/api/access-role/create",
      {
        roleId: paramId,
        add,
        remove,
      }
    );
  }

  [
    {
      id: 1,
      name: "admin",
      parentId: null,
      children: [
        {
          id: 2,
          name: "admin",
          parentId: 1,
        },
      ],
    },
  ];

  const setFormatData = (data) => {
    const parent = data.filter((item) => !item.ParentId);

    const _data = parent.map((item) => {
      return {
        ...item,
        activeKey: [`${item.Id}`],
        children: data.filter((child) => child.ParentId == item.Id),
      };
    });
    setList(_data);
    // console.log(_data);
  };

  const fetchData = async () => {
    const res = await BaseService.get(
      "http://localhost:8081/api/access-key/get-list?roleId=" + paramId
    );
    // console.log(res);
    setFormatData(res.data);
    setRoleList(res.roleList);
    const _checked = {};
    res.roleList?.map((item) => (_checked[item.AccessKeyId] = true));
    setChecked(_checked);
  };

  useEffect(() => {
    fetchData();
    form.setFieldValue("name", paramName);
  }, []);
  return {
    activeKey,
    setActiveKey,
    submitHandle,
    form,
    list,
    setList,
    checked,
    setChecked,
    roleList,
  };
}

export default useRolePermission;
