/* eslint-disable react/prop-types */

import { Select, Table } from "antd";

const TableList = ({ todoList, onChangeStatus, status }) => {
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
            onChange={(value) => onChangeStatus(index, value)}
            options={status?.map((val) => ({ value: val, label: val }))}
            style={{ width: 120 }}
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
  return (
    <Table
      rowClassName={(record, index) => changeColor(record, index)}
      pagination={false}
      columns={columns}
      dataSource={todoList?.map((item, i) => ({ ...item, key: i }))}
    />
  );
};
export default TableList;
