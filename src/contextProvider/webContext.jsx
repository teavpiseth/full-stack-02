/* eslint-disable react/prop-types */
import { createContext } from "react";

export const WebContext = createContext({});

export const WebShareData = ({ data, children }) => {
  return <WebContext.Provider value={data}>{children}</WebContext.Provider>;
};
