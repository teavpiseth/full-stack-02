import React from "react";
import useAccessKey from "./useAccessKey";
import {
  Button,
  Divider,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import AddNew from "./AddNew";
import StringUtil from "../../../utils/String";
import moment from "moment";

function AccessKey() {
  const {
    list,
    listAll,
    dialog,
    pageSizeOptions,
    pagination,
    idHasChild,
    filterHandle,
    onChangeTable,
    onChangePageSize,
    setDialog,
    triggerCloseModal,
    editHandle,
    deleteHandle,
  } = useAccessKey();

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
      title: "Parent",
      dataIndex: "ParentName",
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

  const { Search } = Input;
  return (
    <div>
      <Space style={{ justifyContent: "space-between", width: "100%" }}>
        <Search
          placeholder="Search name and code"
          onChange={(e) => filterHandle({ search: e.target.value })}
          style={{ width: 300 }}
        />
        <Button
          onClick={() => setDialog({ ...dialog, open: true })}
          type="primary"
          icon={<PlusOutlined />}
          size="medium"
        >
          Add New
        </Button>
      </Space>
      <Divider style={{ margin: "15px 0" }} />

      <Table
        columns={columns}
        dataSource={list}
        pagination={{
          pageSize: pagination.pageSize,
          current: pagination.current,
        }}
        onChange={onChangeTable}
      />
      <Select
        defaultValue={5}
        style={{ position: "relative", top: -45 }}
        onChange={onChangePageSize}
        options={pageSizeOptions}
      />
      {dialog.open && (
        <Modal
          open={dialog.open}
          title={dialog.isEdit ? "Update" : "Add New"}
          onCancel={() => setDialog({ ...dialog, open: false, isEdit: false })}
          footer={false}
        >
          <AddNew
            close={triggerCloseModal}
            setOpenDialog={setDialog}
            dialog={dialog}
            list={list}
          />
        </Modal>
      )}
    </div>
  );
}
export default React.memo(AccessKey);
