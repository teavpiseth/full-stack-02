import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import TableList from "./TableList";

export default function TodoList() {
  const status = useMemo(() => ["Done", "Padding", "In Progress"], []);
  const [mode, setMode] = useState("white");
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([
    { name: "Get up at 6am", status: "Done" },
    { name: "Read book at 6 to 6:30 am", status: "In Progress" },
    { name: "Go Office at 8 am", status: "Padding" },
  ]);

  const [filter, setFilter] = useState("");

  function addTodoHandle() {
    setTodo("");
    setTodoList([...todoList, { name: todo, status: "Padding" }]);
    storeTodo([...todoList, { name: todo, status: "Padding" }]);
  }

  function onChangeStatus(index, newStatus) {
    let newTodo = [...todoList];
    newTodo[index].status = newStatus;
    setTodoList(newTodo);
    storeTodo(newTodo);
  }

  const onChangeStatusCb = useCallback(onChangeStatus, [todoList]);

  function statusFilterHandle(value) {
    setFilter(value);
  }

  function storeTodo(data) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  function deleteTodo(index) {
    let newTodo = todoList?.filter((_, i) => i !== index);
    setTodoList(newTodo);
    storeTodo(newTodo);
  }

  const deleteTodoCb = useCallback(deleteTodo, [todoList]);

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      setTodoList(JSON.parse(data));
    }
  }, []);
  return (
    <div style={{ background: mode, padding: "10px", borderRadius: "5px" }}>
      <h2>TodoList</h2>
      <Button
        type="primary"
        title="Change Mode"
        onClick={() => {
          setMode(mode === "white" ? "#ccc" : "white");
          console.log("addTodoHandle");
        }}
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
        index={1}
        status={status}
        todoList={todoList}
        onChangeStatus={onChangeStatusCb}
        filter={filter}
        deleteTodo={deleteTodoCb}
      />
    </div>
  );
}
