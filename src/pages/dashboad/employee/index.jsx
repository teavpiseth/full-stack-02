import { Button, Image, Switch, Table, Tag } from "antd";

import { getImageView, Status } from "../../../utils/constant";
import { useEmployee } from "./hook/useEmployee";
import AddEmployee from "./components/AddEmployee";

const Employee = () => {
  const {
    fixedTop,
    setFixedTop,
    columns,
    dataList,
    isOpenModal,
    setIsOpenModal,
  } = useEmployee();

  function imageCustom(value) {
    return <Image src={getImageView(value)} />;
  }
  function statusCustom(value) {
    return (
      <Tag color={`${value ? "#39c999" : "default"}`}>{Status[value]}</Tag>
    );
  }

  return (
    <>
      <div style={{ textAlign: "right" }}>
        <Button
          type="primary"
          style={{ marginBottom: "10px" }}
          onClick={() => setIsOpenModal(true)}
        >
          Add Employee
        </Button>
      </div>
      {isOpenModal && (
        <AddEmployee isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      )}

      <Table
        columns={columns({
          imageCustom: imageCustom,
          statusCustom: statusCustom,
        })}
        dataSource={dataList}
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
    </>
  );
};
export default Employee;
