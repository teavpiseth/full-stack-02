import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import RoleService from "./RoleService";
import { useRef } from "react";
import useDebounce from "../../../utils/useDebounce";
import StringUtil from "../../../utils/String";
import { useNavigate } from "react-router-dom";

const useRole = () => {
  const navigate = useNavigate();
  const filter = useRef({
    search: null,
    Status: null,
    ParentsId: null,
  });
  const [list, setList] = useState([]);
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
    await RoleService.delete(Id);
    getList();
  }

  async function deleteHandle(record) {
    const Id = record.Id;
    Modal.confirm({
      title: "Delete!",
      content: "Are you sure you want to delete?",
      onOk() {
        promiseDelete(Id);
      },
    });
  }

  async function getList() {
    // const queryUrl = filter.current;
    const response = await RoleService.fetchList("");
    if (response?.data) {
      setList(
        response.data.map((tableRow, index) => ({ ...tableRow, key: index }))
      );
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

  useEffect(() => {
    getList();
  }, []);

  return {
    list,
    pagination,
    dialog,
    pageSizeOptions,
    filterHandle,
    setDialog,
    onChangeTable,
    onChangePageSize,
    triggerCloseModal,
    editHandle,
    deleteHandle,
  };
};

export default useRole;
