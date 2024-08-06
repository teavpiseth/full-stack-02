import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./loop.module.scss";

export default function Loop() {
  const [item, setItem] = useState([1, 2, 3, 4]);
  //   [1, 2, 3, 4]
  //   0 , 1, 2, 3

  // [2, 3, 4]
  //  0 , 1, 2,
  return (
    <div className={style.bgPrimary}>
      <ul>
        <li>
          <Link to="/">Reset State</Link>
        </li>
        <li>
          <Link to="/loop">Loop</Link>
        </li>
        <li>
          <Link to="/about">About us</Link>
        </li>
      </ul>
      {item.map((value, index) => {
        return (
          <div key={value}>
            <input></input>{" "}
            <span
              onClick={() => setItem(item.filter((item) => item !== value))}
            >
              Delete
            </span>
          </div>
        );
      })}
    </div>
  );
}
