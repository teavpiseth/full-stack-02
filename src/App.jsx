import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Loop from "./lesson/manage-state/loop/Loop";

// import TodoList from "./lesson/hook/todoList/TodoList";
import ResetState from "./lesson/manage-state/preserve-reset-sate/ResetState";
import NotFound from "./pages/NotFound";
import TodoList from "./lesson/hook/todoList/TodoList.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ResetState />}></Route>
          <Route path="/loop" element={<Loop />}></Route>
          <Route path="/todo" element={<TodoList />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <ResetState /> */}
      {/* <Loop /> */}
      {/* <TodoList /> */}
    </>
  );
}

export default App;
