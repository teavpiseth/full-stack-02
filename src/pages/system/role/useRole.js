import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import RoleService from "./RoleService";
import { useRef } from "react";
import useDebounce from "src/utils/debounce";
import RouteUtil from "src/utils/RouteUtil";
import  StringUtil from "src/utils";
import { useNavigate  } from "react-router-dom";

const useRole = () => {
  const navigate = useNavigate ();
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

  const columns = [
    {
      title: "No",
      dataIndex: "Id",
      render: (text, record, index) => {
        return pagination.pageSize * (pagination.current - 1) + (index + 1);
      },
    },
    {
      title: "Name",
      dataIndex: "Name",
    },
    {
      title: "Code",
      dataIndex: "Code",
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text) => {
        return (
          <Tag color={`${text ? "cyan" : "red"}`}>
            {StringUtil.getNameStatus(text)}
          </Tag>
        );
      },
    },
    {
      title: "CreateAt",
      dataIndex: "CreateAt",
      render: (date) => {
        return moment(date).format("DD-MM-YYYY");
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button type="primary" size="medium" onClick={() => {navigate(`/add-role-permission?id=${record.Id}&name=${record.Name}`)}}>
            Add Permission
          </Button>
          <Button
            onClick={() => editHandle({ text, record })}
            type="primary"
            icon={<EditOutlined />}
            size="medium"
          ></Button>
          <Button
            onClick={() => deleteHandle(record)}
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="medium"
          ></Button>
        </Space>
      ),
    },
  ];

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
      content: (
        <div>
          <p>Are you sure you want to delete?</p>
        </div>
      ),
      onOk() {
        promiseDelete(Id);
      },
    });
  }

  async function getList() {
    const queryUrl = RouteUtil.objectToQueryString(filter.current);
    const response = await RoleService.fetchList(queryUrl);
    if (response?.list) {
      setList(
        response.list.map((tableRow, index) => ({ ...tableRow, key: index }))
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
    columns,
    list,
    pagination,
    dialog,
    pageSizeOptions,
    filterHandle,
    setDialog,
    onChangeTable,
    onChangePageSize,
    triggerCloseModal,
  };
};

export default useRole;
