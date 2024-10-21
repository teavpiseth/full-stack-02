import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import AccessKeyService from "./AccessKeyService";
import { useRef } from "react";
import useDebounce from "../../../utils/useDebounce";

const useAccessKey = () => {
  const filter = useRef({
    search: null,
    Status: null,
    ParentId: null,
  });
  const [list, setList] = useState([]);
  const [listAll, setListAll] = useState([]);
  const [pagination, setPagination] = useState({ pageSize: 5, current: 1 });
  const [dialog, setDialog] = useState({
    open: false,
    isEdit: false,
    editId: 0,
  });


  function onChangeTable(table) {
    setPagination({ ...pagination, current: table.current });
  }

  function editHandle({ text, record }) {
    setDialog({ open: true, isEdit: true, editId: record.Id });
    // form
  }

  async function promiseDelete(Id) {
    await AccessKeyService.delete(Id);
    getList();
  }

  async function deleteHandle(record) {
    const Id = record.Id;
    Modal.confirm({
      title: "Delete!",
      content: (
       "Are you sure you want to delete?"
    
      ),
      onOk() {
        promiseDelete(Id);
      },
    });
  }

  async function getList() {
    const queryUrl = "";
    const response = await AccessKeyService.fetchList(queryUrl);
    if (response?.data) {
      setList(
        response.data.map((tableRow, index) => ({ ...tableRow, key: index }))
      );
      // setListAll(response.listAll);
    }
  }

  function onChangePageSize(value) {
    setPagination({ ...pagination, pageSize: value });
  }

  const pageSizeOptions = [
    { value: 5, label: "5 rows" },
    { value: 20, label: "20 rows" },
    { value: 30, label: "30 rows" },
    { value: 40, label: "50 rows" },
  ];

  function triggerCloseModal() {
    setDialog({ ...dialog, open: false, isEdit: false });
    getList();
  }

  const debounce = useDebounce();

  function filterHandle(value) {
    filter.current = { ...filter.current, ...value };
    debounce(() => getList());
  }

  const getIdHasChild = (listAll) => {
    let idHasChild = {};
    if (listAll?.length > 0) {
      listAll.forEach((item) => {
        if (item.ParentId ?? "") {
          idHasChild = {
            ...idHasChild,
            [item.ParentId]: [item.ParentId]?.toString(),
          };
        }
      });
    }
    return idHasChild;
  };

  const idHasChild = getIdHasChild(listAll);

  listAll.forEach((item, index) => {});

  useEffect(() => {
    getList();
  }, []);

  return {

    list,
    listAll,
    idHasChild,
    pagination,
    dialog,
    pageSizeOptions,
    filterHandle,
    setDialog,
    onChangeTable,
    onChangePageSize,
    triggerCloseModal,
    editHandle, 
    deleteHandle
  };
};

export default useAccessKey;
