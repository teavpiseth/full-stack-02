import "./App.css";
import Category from "./components/category/Category";
import ModalComponent from "./lesson/adding-interactivity/ant-design/Modal";
import StateAsSnapshot from "./lesson/adding-interactivity/state-as-snapshot/StateAsSnapshot";
import StateComponentMemory from "./lesson/adding-interactivity/state-component-memory/StateComponentMemory";
import UpdateObjectState from "./lesson/adding-interactivity/update-object/UpdateObjectState";
import MemoComponent from "./lesson/hook/memo/MemoComponent";
import UseEffect from "./lesson/hook/use-effect/UseEffect";

function App() {
  return (
    <>
      {/* <StateComponentMemory /> */}
      {/* <StateAsSnapshot /> */}
      {/* <ModalComponent /> */}
      {/* <UpdateObjectState /> */}
      {/* <UseEffect /> */}
      <MemoComponent />
    </>
  );
}

export default App;
