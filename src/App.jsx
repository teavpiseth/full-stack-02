import "./App.css";
import Category from "./components/category/Category";
import Image1 from "./assets/images/category/car.jpg";
import Image2 from "./assets/images/category/laptop.jpg";
import Image3 from "./assets/images/category/moto.jpg";
import Image4 from "./assets/images/category/phone.jpg";
import RenderList from "./lesson/UI/RenderList";
import AddingEventHandlers from "./lesson/adding-interactivity/responding-to-events/AddingEventHandlers ";
import StateComponentMemory from "./lesson/adding-interactivity/state-component-memory/StateComponentMemory";

function App() {
  const category = [
    { image: Image1, name: "Car", color: "red", price: "20" },
    { image: Image2, name: "Motor", color: "black", price: 20 },
    { image: Image3, name: "Phone", color: "white", price: 20 },
    { image: Image4, name: "Laptop", color: "brown", price: 20 },
  ];
  return (
    <>
      <StateComponentMemory />
      {/* <AddingEventHandlers /> */}
      {/* <RenderList /> */}
      {/* <h2 style={{ textAlign: "left" }}>Category</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        {category.map((obj, i) => {
          return (
            <Category key={i} {...obj}>
              <p>
                {obj.color} <span>1</span>
              </p>
            </Category>
          );
        })}
      </div> */}
    </>
  );
}

export default App;
