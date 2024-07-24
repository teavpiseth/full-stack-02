/* eslint-disable react/prop-types */

import { Select } from "antd";
import React from "react";
import { status } from "./data";

function Greeting({ name, todo, onUpdate }) {
  console.log("re-render", name);
  return (
    <div>
      Welcome {name}
      <ul>
        {todo?.map((item, i) => {
          return (
            <li key={i}>
              {item.message}{" "}
              <Select
                value={item.status}
                style={{ width: 120 }}
                onChange={(value) => onUpdate(i, value)}
                options={status}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default React.memo(Greeting);
