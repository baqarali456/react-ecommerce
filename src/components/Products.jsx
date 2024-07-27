import ProductCard from "./ProductCard";


const Products = () => {
  return (
    <div className="my-5 d-flex flex-row ">
      <div className="d-flex flex-column mx-5">
        <h4 className=" text-xl-center">Filter Products</h4>
        <input min={1000} max={30000} type="range" name="" id="" />
        <p className=" text-">Price Range</p>
        <h4 className=" text-xl-center my-1">Category</h4>
        <select name="category" >
          <option value="mobile">Mobile</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>
      <div className="d-flex flex-column flex-wrap ">
        <h2 className=" text-xl-center">Products</h2>
        <div className=" d-flex flex-row">
          <ProductCard/>
        </div>
      </div>
    </div>
  )
}

export default Products;
