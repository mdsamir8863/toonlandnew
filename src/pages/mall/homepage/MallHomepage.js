import Navbar from "../../../components/navbar/Navbar";
import ComicsHeader from "../../../components/products_header/ProductsHeader";
import ProductsList from "../../../components/products_list/ProductsList";
import ComicsList from "../../../components/products_list/SingleProduct";
import Slider from "../../../components/slider/Slider";

function MallHomepage() {
  return (
    <>
      <Navbar />
      <Slider />
      <ComicsHeader />
      <div style={{ minHeight: "100vh" }}>
        <ProductsList />
      </div>
    </>
  );
}

export default MallHomepage;
