import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/web-integrate-api/homePage/integrate.jsx";
import ProductDetail from "./pages/web-integrate-api/productDetailPage/ProductDetail.jsx";
import ProductCategory from "./pages/web-integrate-api/productCategory/ProductCategory.jsx";
import MasterLayoutWeb from "./master-layout-web/MasterLayoutWeb.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { WebContext, WebShareData } from "./contextProvider/webContext.jsx";
import TeaSet from "./lesson/UI/ComponentPure.jsx";
function App() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const apiUrl = "https://piseth.site/api/web/category/get-list";
    axios({
      method: "get",
      url: apiUrl,
    }).then(function (response) {
      setCategory(response.data.list);
    });
  }, []);

  function alertAtAppComponent() {
    alert("Hello alertAtAppComponent");
  }
  return (
    <>
      <WebShareData
        data={{
          category: category,
          alertAtAppComponent: alertAtAppComponent,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route element={<MasterLayoutWeb />}>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/product-detail" element={<ProductDetail />}></Route>
              <Route
                path="/product-category"
                element={<ProductCategory />}
              ></Route>
              <Route path="/*" element={<NotFound />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </WebShareData>
    </>
  );
}

export default App;
