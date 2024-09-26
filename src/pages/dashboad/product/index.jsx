import { Button, Image, Input, Switch, Table, Tag } from "antd";

import {
  getImageView,
  getImageViewServer,
  Status,
} from "../../../utils/constant";
import { useProduct } from "./hook/useProduct";
import AddProduct from "./components/AddProduct";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useDebounce from "../../../utils/useDebounce";
import UploadImage from "./components/UploadImage";

const Product = () => {
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
    dataCategory,
    fetchCategory,
    isOpenModelUpload,
    setIsOpenModelUpload,
  } = useProduct();

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
          onClick={() => {
            fetchCategory();
            setIsOpenModal(true);
          }}
        >
          Add Product
        </Button>
      </div>
      {isOpenModal && (
        <AddProduct
          isOpen={isOpenModal}
          setIsOpen={(value) => {
            setIsOpenModal(value);
            setEdit({ isEdit: false, data: {} });
          }}
          fetchData={fetchData}
          edit={edit}
          categoryList={dataCategory}
        />
      )}
      {isOpenModelUpload && (
        <UploadImage
          setIsOpenModelUpload={setIsOpenModelUpload}
          isOpen={isOpenModelUpload}
        />
      )}

      <Table
        columns={columns({
          imageCustom: imageCustom,
          statusCustom: statusCustom,
          action: (record) => (
            <div>
              <Button onClick={() => setIsOpenModelUpload(true)}>
                Add/Edit image
              </Button>
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
          fetchData(searchName);
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
export default Product;
