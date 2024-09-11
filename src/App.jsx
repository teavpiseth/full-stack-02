import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/web-integrate-api/homePage/integrate.jsx";
import ProductDetail from "./pages/web-integrate-api/productDetailPage/ProductDetail.jsx";
import ProductCategory from "./pages/web-integrate-api/productCategory/ProductCategory.jsx";
import MasterLayoutWeb from "./master-layout-web/MasterLayoutWeb.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { WebShareData } from "./contextProvider/webContext.jsx";
import MasterLayoutDashboard from "./master-layout-dashboard/MasterLayoutDashboard.jsx";
import Login from "./pages/login/index.jsx";
import BaseService from "./services/BaseService.js";
import Employee from "./pages/dashboad/employee/index.jsx";
import "./services/AxiosInterceptor.js";
function App() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const apiUrl = "https://piseth.site/api/web/category/get-list";

    BaseService.get(apiUrl).then(function (response) {
      setCategory(response.list);
    });
  }, []);

  function alertAtAppComponent() {
    alert("Hello from parent component");
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
            <Route element={<MasterLayoutDashboard />}>
              <Route path="/dashboard" element={<p>Home</p>}></Route>
              <Route
                path="/dashboard/employee"
                element={<Employee></Employee>}
              ></Route>
              <Route
                path="/dashboard/customer"
                element={<h2>Hello customer</h2>}
              ></Route>

              <Route path="/dashboard/*" element={<NotFound />}></Route>
            </Route>
            <Route path="/dashboard/login" element={<Login />}></Route>

            <Route element={<MasterLayoutWeb />}>
              <Route path="/web" element={<HomePage />}></Route>
              <Route
                path="/web/product-detail"
                element={<ProductDetail />}
              ></Route>
              <Route
                path="/web/product-category"
                element={<ProductCategory />}
              ></Route>
              <Route path="/web/*" element={<NotFound />}></Route>
            </Route>
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </WebShareData>
    </>
  );
}

export default App;
