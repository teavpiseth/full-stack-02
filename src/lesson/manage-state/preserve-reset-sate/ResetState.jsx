/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./resetState.module.css";

export default function ResetState() {
  const [isFancy, setIsFancy] = useState(false);
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
      {isFancy ? (
        <Counter key="true" isFancy={true} />
      ) : (
        <Counter key="false" isFancy={false} />
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={(e) => {
            setIsFancy(e.target.checked);
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{ border: `8px solid ${isFancy ? "pink" : "black"}` }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>Add one</button>
    </div>
  );
}
