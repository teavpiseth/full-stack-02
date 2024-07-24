import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space } from "antd";
import React, { useState } from "react";
import TableList from "./TableList";

export default function TodoList() {
  const status = ["Done", "Padding", "In Progress"];
  const [mode, setMode] = useState("white");
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([
    { name: "Get up at 6am", status: "Done" },
    { name: "Read book at 6 to 6:30 am", status: "In Progress" },
    { name: "Go Office at 8 am", status: "Padding" },
  ]);
  // const [filterTodoList, setFilterTodoList] = useState([todoList);

  function addTodoHandle() {
    setTodo("");
    setTodoList([...todoList, { name: todo, status: "Padding" }]);
  }

  function onChangeStatus(index, newStatus) {
    console.log(index, newStatus);
    let newTodo = [...todoList];
    newTodo[index].status = newStatus;
    setTodoList(newTodo);
  }

  function statusFilterHandle(value) {
    if (!value) {
      console.log("hi");
    }
    // let newTodo = [...todoList];
    // newTodo = newTodo.filter((item) => item.status === value);
    // setTodoList(newTodo);
  }
  return (
    <div style={{ background: mode, padding: "10px", borderRadius: "5px" }}>
      <h2>TodoList</h2>
      <Button
        type="primary"
        title="Change Mode"
        onClick={() => setMode(mode === "white" ? "#ccc" : "white")}
      >
        Change Mode
      </Button>
      <br />
      <br />
      <Space>
        <Input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="Enter Todo"
        ></Input>
        <PlusOutlined
          onClick={addTodoHandle}
          size={20}
          style={{ color: "blue", cursor: "pointer" }}
        />
      </Space>
      <br />
      <br />
      <Space>
        <label>Filter</label>
        <Select
          allowClear
          onChange={(value) => statusFilterHandle(value)}
          options={status?.map((val) => ({ value: val, label: val }))}
          style={{ width: 120 }}
        />
      </Space>
      <br />
      <TableList
        status={status}
        todoList={todoList}
        onChangeStatus={onChangeStatus}
      />
    </div>
  );
}
