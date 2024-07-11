import React from "react";

export function Button() {
  const name = "Saveni";
  const student = [
    { name: "try", age: "18" },
    { name: "Veourn", age: "20" },
  ];
  const tryIsStudent = false;

  function helloWorld() {
    console.log("Hello World");
  }

  const hello = (name) => {
    alert(`Hello ${name}, this just test use javascript`);
  };
  return (
    <>
      {student.map((item) => {
        return (
          <div key={item.name}>
            <div>Name: {item.name}</div> <br />
            <p>Age: {item.age}</p>
          </div>
        );
      })}
      {helloWorld()}

      {tryIsStudent ? <p>Yes, Try is student</p> : <p>No, he isn't</p>}

      <button onClick={() => hello("Sousden")}>Button Click {name}</button>
    </>
  );
}
