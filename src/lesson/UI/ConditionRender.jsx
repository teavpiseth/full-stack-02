// eslint-disable-next-line react/prop-types

import Item from "./Item";

export function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item isPacked={false} name="Vuth Saven" />
        <Item isPacked={true} name="Pich tongtan" />
        <Item isPacked={true} name="DaraVuth" />
      </ul>
    </section>
  );
}
