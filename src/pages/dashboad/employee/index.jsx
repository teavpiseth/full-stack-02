import { Button, Image, Input, Switch, Table, Tag } from "antd";

import {
  getImageView,
  getImageViewServer,
  Status,
} from "../../../utils/constant";
import { useEmployee } from "./hook/useEmployee";
import AddEmployee from "./components/AddEmployee";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useDebounce from "../../../utils/useDebounce";

const Employee = () => {
  const {
    fixedTop,
    setFixedTop,
    columns,
    dataList,
    isOpenModal,
    setIsOpenModal,
    fetchData,
    handleDelete,
    edit,
    setEdit,
    searchName,
    setSearchName,
    pagination,
  } = useEmployee();

  const debounce = useDebounce();

  function imageCustom(value) {
    return <Image src={getImageViewServer(value)} />;
  }
  function statusCustom(value) {
    return (
      <Tag color={`${value ? "#39c999" : "default"}`}>{Status[value]}</Tag>
    );
  }

  return (
    <>
      <div
        style={{
          textAlign: "right",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Input
          value={searchName}
          onChange={(event) => {
            setSearchName(event.target.value);
            debounce(() => fetchData(event.target.value), 2000);
          }}
          placeholder="Search Name"
          style={{ width: "200px" }}
        />
        <Button
          type="primary"
          style={{ marginBottom: "10px" }}
          onClick={() => setIsOpenModal(true)}
        >
          Add Employee
        </Button>
      </div>
      {isOpenModal && (
        <AddEmployee
          isOpen={isOpenModal}
          setIsOpen={(value) => {
            setIsOpenModal(value);
            setEdit({ isEdit: false, data: {} });
          }}
          fetchData={fetchData}
          edit={edit}
        />
      )}

      <Table
        columns={columns({
          imageCustom: imageCustom,
          statusCustom: statusCustom,
          action: (record) => (
            <div>
              <DeleteOutlined
                onClick={() => handleDelete(record)}
                style={{ color: "red" }}
              />
              <EditOutlined
                style={{ color: "blue", marginLeft: "10px" }}
                onClick={() => {
                  setEdit({ isEdit: true, data: record });
                  setIsOpenModal(true);
                }}
              />
            </div>
          ),
        })}
        dataSource={dataList}
        scroll={{
          x: 1500,
        }}
        onChange={(_pagination) => {
          pagination.current.current = _pagination.current;
          fetchData();
        }}
        pagination={{
          current: pagination.current.current,
          pageSize: pagination.current.pageSize,
          total: pagination.current.totalRecode,
        }}
      />
    </>
  );
};
export default Employee;
