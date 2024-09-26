/* eslint-disable react/prop-types */
import CategoryList from "../CategoryList";
import Slide from "../Slide";
import Product from "../Product";
import { useContext, useEffect, useState } from "react";
import BaseService from "../../../services/BaseService";
import { WebContext } from "../../../contextProvider/webContext";

export default function HomePage() {
  const dataContext = useContext(WebContext);
  useEffect(() => {
    const apiUrl = "https://piseth.site/api/web/category/get-list";

    BaseService.get(apiUrl).then(function (response) {
      dataContext.setCategory(response.list);
    });
  }, []);
  return (
    <div>
      <Slide />
      <CategoryList />
      <Product />
    </div>
  );
}
