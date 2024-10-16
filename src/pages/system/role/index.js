import React from "react";
import useRole from "./useRole";
import {
  Button,
  Divider,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddNew from "./AddNew";
import  StringUtil from "src/utils";

function Role() {
  const {
    columns,
    list,
    dialog,
    pageSizeOptions,
    pagination,
    filterHandle,
    onChangeTable,
    onChangePageSize,
    setDialog,
    triggerCloseModal,
  } = useRole();

  const { Search } = Input;
  return (
    <div>
      <Space style={{ justifyContent: "space-between", width: "100%" }}>
        <Search
          placeholder="Search name"
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
      <Space style={{ marginBottom: "15px" }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Filter
        </Typography.Title>
        <Select
          style={{ width: "120px" }}
          placeholder="status"
          onChange={(value) => {
            filterHandle({ Status: value?.toString() });
          }}
          allowClear
        >
          <Select.Option value={1}>{StringUtil.getNameStatus(1)}</Select.Option>
          <Select.Option value={0}>{StringUtil.getNameStatus(0)}</Select.Option>
        </Select>
      </Space>
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
export default React.memo(Role);
