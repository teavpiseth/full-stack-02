/* eslint-disable react/prop-types */
import React from "react";

// function Button({ onClick, children }) {
//     return (
//       <button onClick={e => {
//         e.stopPropagation();
//         onClick();
//       }}>
//         {children}
//       </button>
//     );
//   }

export default function AddingEventHandlers() {
  function handleClick() {
    alert("You clicked on Parent!");
  }

  function handleInput(e) {
    // console.log("param event", e);
    console.log("value", e.target.value);
  }

  return (
    <>
      <input onKeyUp={handleInput}></input>
      <div
        style={{
          padding: "10px",
          background: "lightgray",
        }}
        className="Toolbar"
        onClick={() => {
          alert("You clicked on the toolbar!");
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert("Playing!");
          }}
        >
          Play Movie
        </button>
        <button onClick={() => alert("Uploading!")}>Upload Image</button>
      </div>
    </>
  );
}
