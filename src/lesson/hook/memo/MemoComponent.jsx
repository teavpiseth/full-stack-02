import React, { useCallback, useMemo, useState } from "react";
import Greeting from "./Greeting";
import { status } from "./data";

const todo = [
  { message: "Do home work", status: 1 },
  { message: "Do school work", status: 2 },
  { message: "Do sport", status: 1 },
  { message: "Do exercise", status: 2 },
];
export default function MemoComponent() {
  const [name, setName] = useState("");
  const [todoName, setTodoName] = useState([]);
  const [address, setAddress] = useState("");
  const [mode, setMode] = useState("white");

  function callBack() {
    return todoName?.filter((item) => item.status !== 1);
  }
  const todoNameFilter = useMemo(callBack, [todoName]);

  todoName?.filter((item) => item.status !== "Done");

  function _updateTodo(index, newStatus) {
    let newTodo = [...todoNameFilter];
    newTodo[index].status = newStatus;
    setTodoName(todoNameFilter);
  }

  const updateTodo = useCallback(_updateTodo, [todoNameFilter]);

  return (
    <div style={{ background: mode, padding: "10px" }}>
      <button onClick={() => setMode(mode === "white" ? "#ccc" : "white")}>
        Change Mode
      </button>
      <ul>
        {todo?.map((item, i) => {
          return (
            <li key={i}>
              {item.message}{" "}
              <span style={{ color: "blue" }}>
                {status?.find((obj) => obj.value === item.status)?.label}
              </span>
              <button onClick={() => setTodoName([...todoName, item])}>
                Add
              </button>
            </li>
          );
        })}
      </ul>
      <label>Name</label>
      <br />
      <input
        placeholder="Name"
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Address</label>
      <br />
      <input
        placeholder="Address"
        value={address}
        type="text"
        onChange={(e) => setAddress(e.target.value)}
      />
      <br />
      <br />
      <hr />
      <Greeting name={name} todo={todoNameFilter} onUpdate={updateTodo} />
      {/* <NoProps /> */}
    </div>
  );
}
