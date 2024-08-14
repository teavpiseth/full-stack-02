/* eslint-disable react/prop-types */
import CategoryList from "../CategoryList";
import Slide from "../Slide";
import Product from "../Product";

export default function HomePage() {
  return (
    <div>
      <Slide />
      <CategoryList />
      <Product />
    </div>
  );
}
