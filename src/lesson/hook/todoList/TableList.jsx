/* eslint-disable react/prop-types */

import { CloseCircleOutlined } from "@ant-design/icons";
import { Select, Table } from "antd";
import React from "react";

const TableList = ({
  todoList,
  onChangeStatus,
  status,
  filter,
  deleteTodo,
}) => {
  console.log("render TableList");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, record, index) => {
        return (
          <Select
            value={record.status}
            onChange={(value) => onChangeStatus(record.key, value)}
            options={status?.map((val) => ({ value: val, label: val }))}
            style={{ width: 120 }}
          />
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <CloseCircleOutlined
            onClick={() => deleteTodo(record.key)}
            style={{ color: "red", cursor: "pointer" }}
          />
        );
      },
    },
  ];

  const changeColor = (record, index) => {
    if (record.status === "Done") {
      return "table-done";
    } else if (record.status === "Padding") {
      return "table-padding";
    } else if (record.status === "In progress") {
      return "table-progress";
    }
  };

  const dataSource = todoList?.map((item, index) => {
    return { ...item, key: index };
  });

  const dataFilter = dataSource?.filter((item) => {
    if (!filter) {
      return true;
    }
    return item.status === filter;
  });

  return (
    <Table
      rowClassName={(record, index) => changeColor(record, index)}
      pagination={false}
      columns={columns}
      dataSource={dataFilter}
    />
  );
};
export default React.memo(TableList);
