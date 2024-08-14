/* eslint-disable react/prop-types */

import { useContext } from "react";
import { WebContext } from "../../contextProvider/webContext.jsx";

function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  console.log("teaset");
  const dataContext = useContext(WebContext);
  console.log("dataContext", dataContext);
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}
