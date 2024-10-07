import { Image, Modal, notification, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import { Gender, getImageView, Status } from "../../../../utils/constant";
import moment from "moment";
import BaseService from "../../../../services/BaseService";
import { DeleteOutlined } from "@ant-design/icons";

export function useEmployee() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [fixedTop, setFixedTop] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [edit, setEdit] = useState({
    isEdit: false,
    data: {},
  });
  const pagination = useRef({
    current: 1, //page
    pageSize: 3, // limit
    totalRecode: 0,
  });

  function columns({ imageCustom, statusCustom, action }) {
    return [
      {
        title: "Name",
        width: 100,
        dataIndex: "FirstName",
        key: "FirstName",
        fixed: "left",
        render: (record, text, index) => {
          return `${text.FirstName} ${text.LastName}`;
        },
      },
      {
        title: "Image",
        dataIndex: "address",
        key: "1",
        width: 150,
        render: (record, text, index) => imageCustom(text.Image),
      },
      {
        title: "Gender",
        dataIndex: "Gender",
        key: "Gender",
        width: 150,
      },
      // {
      //   title: "Role",
      //   dataIndex: "RoleName",
      //   key: "RoleName",
      //   width: 150,
      // },
      {
        title: "Dob",
        dataIndex: "Dob",
        key: "Dob",
        width: 150,
        render: (record, text, index) => {
          return moment(text.Dob).format("MMMM Do YYYY");
        },
      },
      {
        title: "Tel",
        dataIndex: "Tel",
        key: "Tel",
        width: 150,
      },
      {
        title: "Email",
        dataIndex: "Email",
        key: "Email",
        width: 150,
      },
      {
        title: "Address",
        dataIndex: "Address",
        key: "7",
        width: 150,
      },
      {
        title: "Status",
        dataIndex: "Status",
        render: (record, text, index) => {
          return statusCustom(text.Status);
        },
        key: "8",
        width: 150,
      },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        render: action,
      },
    ];
  }

  async function fetchData(search = "") {
    let API = "http://localhost:8081/api/employee/get-list";

    API += `?page=${pagination.current.current}&limit=${pagination.current.pageSize}`;
    if (search) {
      API += `&search_name=${search}`;
    }

    const res = await BaseService.get(API);
    setDataList(
      res.data?.map((item) => ({
        ...item,
        key: item.Id,
      }))
    );
    pagination.current.totalRecode = res.totalRecord;
  }

  const confirmDelete = async (id) => {
    const res = await BaseService.delete(
      `http://localhost:8081/api/employee/delete`,
      { id }
    );
    if (res) {
      notification.success({
        message: "Delete Success",
        placement: "topRight",
      });
      fetchData();
    }
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Delete Employee",
      content: "Are you sure you want to delete!",
      onOk: () => confirmDelete(record.Id),
      onCancel: () => {},
    });
    console.log(record);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    dataList,
    fixedTop,
    setFixedTop,
    columns,
    isOpenModal,
    setIsOpenModal,
    fetchData,
    handleDelete,
    edit,
    setEdit,
    searchName,
    setSearchName,
    pagination,
  };
}
