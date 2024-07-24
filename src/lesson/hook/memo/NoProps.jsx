import React from "react";

// React.memo // use for prevent re-render
function NoProps() {
  console.log("re-render");
  return <div>NoProps</div>;
}

export default React.memo(NoProps);
