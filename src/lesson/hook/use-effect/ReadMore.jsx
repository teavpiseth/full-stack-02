import { Modal } from "antd";
import { useEffect, useState } from "react";

export default function ReadMore() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Mount");
  }, []); // componentDidMount
  const [color, setColor] = useState("black");
  useEffect(() => {
    console.log("Update", count);
  }, [count, color]); // component didUpdate

  return (
    <div>
      <p style={{ color: color }}>
        Read more sample sample sample sample sample sample sample sample sample
        sample sample sample sample sample sample sample sample sample sample
        sample sample sample sample sample sample sample sample sample sample
        sample sample sample sample sample sample sample sample sample sample
        sample sample sample sample sample sample sample sample sample sample
        sample sample sample sample sample sample sample sample sample sample
        sample sample sample
      </p>
      <button onClick={() => setColor(color === "black" ? "blue" : "black")}>
        Change Color
      </button>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}
