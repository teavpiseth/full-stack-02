/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const WebContext = createContext({});

export const WebShareData = ({ data, children }) => {
  const [category, setCategory] = useState([]);
  return (
    <WebContext.Provider value={{ ...data, category, setCategory }}>
      {children}
    </WebContext.Provider>
  );
};
