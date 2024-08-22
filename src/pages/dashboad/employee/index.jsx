import React, { useState } from "react";
import { Image, Switch, Table, Tag } from "antd";
import { dataList } from "./constant";
import { render } from "react-dom";
import { Gender, getImageView, Status } from "../../../utils/constant";
import moment from "moment";
import { useEmployee } from "./hook/useEmployee";

const Employee = () => {
  const { fixedTop, setFixedTop, columns } = useEmployee();

  function imageCustom(value) {
    return <Image src={getImageView(value)} />;
  }
  function statusCustom(value) {
    return (
      <Tag color={`${value ? "#39c999" : "default"}`}>{Status[value]}</Tag>
    );
  }

  return (
    <Table
      columns={columns({
        imageCustom: imageCustom,
        statusCustom: statusCustom,
      })}
      dataSource={dataList.list}
      scroll={{
        x: 1500,
      }}
      summary={() => (
        <Table.Summary fixed={fixedTop ? "top" : "bottom"}>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={2}>
              <Switch
                checkedChildren="Fixed Top"
                unCheckedChildren="Fixed Top"
                checked={fixedTop}
                onChange={() => {
                  setFixedTop(!fixedTop);
                }}
              />
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2} colSpan={8}>
              Scroll Context
            </Table.Summary.Cell>
            <Table.Summary.Cell index={10}>Fix Right</Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
      // antd site header height
      sticky={{
        offsetHeader: 64,
      }}
    />
  );
};
export default Employee;
