import { useState } from "react";

export default function StateAsSnapshot() {
  const [number, setNumber] = useState(0);
  console.log("number", number);
  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1); //1
          setTimeout(() => {
            alert(number);
          }, 10000);
        }}
      >
        +1
      </button>
    </>
  );
}
