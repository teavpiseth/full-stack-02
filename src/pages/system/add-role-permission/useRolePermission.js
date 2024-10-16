import { useEffect, useRef, useState } from "react";
import RolePermissionService from "./RolePermissionService";
import { Checkbox, Collapse, Form } from "antd";
import { useLocation } from "react-router-dom";
import RouteUtil from "src/utils/RouteUtil";
import LocalStorage from "src/utils/LocalStorage";
// import RoleService from "../role/RoleService";

function useRolePermission() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Access specific query parameters
  const Id = queryParams.get("id");
  const Name = queryParams.get("name");
  // console.log(Id, Name);

  const [form] = Form.useForm();

  const [panelList, setPanelList] = useState([]);
  const accessible = useRef([]);
  const accessKeyRef = useRef({
    list: [],
    listGroup: [],
  });
  const [newChecked, setNewChecked] = useState([]);
  const [removeChecked, setRemoveChecked] = useState([]);

  let accessibleObj = arrayObjToObj(accessible.current);
  const removeCheckedObj = arrayObjToObj(removeChecked);
  const checkedObj = arrayObjToObj(newChecked);

  function checkBoxHandle(accessKey, isChecked) {
    const isPreviousValue = accessible.current?.find(
      (item) => item.Code === accessKey.Code
    )?.Code
      ? true
      : false;

    if (isChecked === false) {
      if (isPreviousValue) {
        setRemoveChecked([
          ...removeChecked,
          { ...accessKey, roleAccessId: accessibleObj?.[accessKey.Code]?.Id },
        ]);
      } else {
        setNewChecked(
          newChecked?.filter((item) => item.Code !== accessKey.Code) ?? []
        );
      }
    } else {
      // const hasParent = accessKey?.ParentId?.toString();
      // if (hasParent) {
      //   const parentCode = accessKeyRef.current.list?.find(
      //     (item) => item.Id === accessKey.ParentId
      //   )?.Code;
      //   const isParentChecked =
      //     accessible.current?.find((item) => item.Code === parentCode)?.Code ||
      //     checked?.[parentCode]?.Code
      //       ? true
      //       : false;
      //   if (isParentChecked === false) {
      //     setNewChecked((pre) => ({
      //       ...pre,
      //       [parentCode]: {
      //         ...accessKey
      //       },
      //     }));
      //   }
      // }
      if (isPreviousValue) {
        setRemoveChecked(
          removeChecked?.filter((item) => item.Code !== accessKey.Code)
        );
      } else {
        setNewChecked((pre) => [
          ...pre,
          {
            ...accessKey,
          },
        ]);
      }
    }
  }

  function arrayObjToObj(data) {
    return data?.reduce((result, obj) => {
      return { ...result, [obj.Code]: { ...obj } };
    }, {});
  }

  function isCheckBoxFunc(code) {
    if (accessibleObj[code]?.Code && !removeCheckedObj[code]?.Code) {
      return true;
    } else if (checkedObj[code]) {
      return true;
    }
    return false;
  }

  const getChildren = (item) => {
    try {
      return item?.map((obj) => {
        if (obj?.Children?.length <= 0) {
          return (
            <Checkbox
              key={obj.Code}
              style={{ marginLeft: 25 }}
              checked={isCheckBoxFunc(obj.Code)}
              onChange={(e) => checkBoxHandle(obj, e.target.checked)}
            >
              {obj.Name}
            </Checkbox>
          );
        }
        return <Collapse key={obj.Code} items={getItems([obj] ?? [])} />;
      });
    } catch (error) {
      console.log(error);
    }
  };

  function getItems(items) {
    try {
      if (items.length <= 0) {
        return;
      }
      return items.map((obj) => {
        return {
          key: obj.Code,
          label: (
            <Checkbox
              checked={isCheckBoxFunc(obj.Code)}
              onChange={(e) => checkBoxHandle(obj, e.target.checked)}
            >
              {obj.Name}
            </Checkbox>
          ),
          children:
            obj?.Children?.length > 0 ? (
              getChildren(obj?.Children)
            ) : (
              <p>{obj.Name}</p>
            ),
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getList() {
    const queryUrl = RouteUtil.objectToQueryString({ roleId: Id });
    // console.log({ queryUrl });
    const resultAccessible = await RolePermissionService.fetchListRoleAccess(
      queryUrl
    );
    const result = await RolePermissionService.fetchList("");

    accessible.current = resultAccessible?.list ?? [];

    LocalStorage.setAuthority(resultAccessible?.list?.map((item) => item.Code));

    accessibleObj = arrayObjToObj(accessible.current);
    accessKeyRef.current = {
      listGroup: result?.listGroup ?? [],
      list: result?.list ?? [],
    };
    setPanelList(getItems(accessKeyRef.current.listGroup));
  }

  async function submitHandle(value) {
    const result = await RolePermissionService.update({
      newChecked,
      removeChecked,
      roleId: form.getFieldValue("roleId"),
    });
    if (result?.result) {
      getList();
      setRemoveChecked([]);
      setNewChecked([]);
    }
  }
  useEffect(() => {
    getList();
    if (Name && Id) {
      form.setFieldValue("roleName", Name);
      form.setFieldValue("roleId", Id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPanelList(getItems(accessKeyRef.current.listGroup) ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newChecked, removeChecked]);

  return { panelList, form, checkBoxHandle, submitHandle, param: { Id, Name } };
}

export default useRolePermission;
