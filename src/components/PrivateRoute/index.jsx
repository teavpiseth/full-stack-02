/* eslint-disable react/prop-types */
import { Authority } from "../../utils/Authority";
// import NotFound from "../../pages/NotFound";
import Unauthorized from "../UnAuthorizePage";

export default function PrivateRoute({ authorityKey, component: Component }) {
  if (Authority.check(authorityKey) === false) {
    return <Unauthorized />;
  }
  return (
    <div>
      <Component />
    </div>
  );
}
