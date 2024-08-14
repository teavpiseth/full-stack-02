import { Outlet } from "react-router-dom";
import FooterWeb from "../pages/web/Footer";
import HeaderWeb from "../pages/web/Header";

export default function MasterLayoutWeb() {
  return (
    <div>
      <HeaderWeb />
      <Outlet />
      <FooterWeb />
    </div>
  );
}
