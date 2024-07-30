import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCategories, changeCategoryName } from "../store/categorySlice";
import {
  changecategory,
  changedescription,
  changeprice,
  changeproductImage,
  changeproductName,
  changestock,
} from "../store/productSlice";

function Dashboard() {
  const user = useSelector((state) => state.RegisterReducer.loggedin);
  const categoryName = useSelector(
    (state) => state.CategoryReducer.categoryname
  );
  const allcategories = useSelector(
    (state) => state.CategoryReducer.categories
  );
  const productName = useSelector((state) => state.ProductReducer.productName);
  const productImage = useSelector(
    (state) => state.ProductReducer.productImage
  );
  const description = useSelector((state) => state.ProductReducer.description);
  const category = useSelector((state) => state.ProductReducer.category);
  const price = useSelector((state) => state.ProductReducer.price);
  const stock = useSelector((state) => state.ProductReducer.stock);

  const { role } = user;
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    if (role === "admin") {
      axios.post(
        "http://localhost:4000/api/v1/products/create-Product",
        {
          name: productName,
          productImage,
          description,
          price,
          stock,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("accessToken")
            )}`,
          },
        }
      );
    }
  };

  const handleAddCategory = () => {
    if (role === "admin") {
      axios
        .post(
          "http://localhost:4000/api/v1/category/add-category",
          {
            name: categoryName,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("accessToken")
              )}`,
            },
          }
        )
        .then((response) => {
          dispatch(addCategories(response.data.data));
          dispatch(changeCategoryName(""));
        });
    }
  };

  return (
    <>
      <h1 className=" text-center my-4">Dashboard</h1>
      <div className=" border-3 border d-flex flex-row m-auto my-3 gap-5 mx-3 h-100  ">
        <div
          id="left"
          className=" d-flex flex-column  border border-secondary w-25 h-100 "
        >
          <span className=" fs-4 d-flex flex-row align-items-center justify-content-center">
            Products
          </span>
          <hr />
          <span className=" fs-4 d-flex flex-row align-items-center justify-content-center">
            Category
          </span>
        </div>
        <div id="right" className=" d-flex flex-column   ">
          <input
            id="productName"
            onChange={(e) => dispatch(changeproductName(e.target.value))}
            value={productName}
            className=" my-1"
            type="text"
            name=""
            placeholder="Enter name"
          />

          <input
            onChange={(e) => dispatch(changedescription(e.target.value))}
            id="description"
            value={description}
            className=" my-1"
            type="text"
            name=""
            placeholder="Enter description"
          />

          <input
            id="productImage"
            onChange={(e) => dispatch(changeproductImage(e.target.value))}
            value={productImage}
            className=" my-1"
            type="file"
            name=""
            placeholder="Enter image"
          />

          <input
            id="stock"
            min={0}
            onChange={(e) => dispatch(changestock(e.target.value))}
            value={stock}
            className=" my-1"
            type="number"
            name=""
            placeholder="Enter stock"
          />

          <input
            id="price"
            min={0}
            onChange={(e) => dispatch(changeprice(e.target.value))}
            value={price}
            className=" my-1"
            type="number"
            name=""
            placeholder="Enter price"
          />

          <select
            onChange={(e) => dispatch(changecategory(e.target.value))}
            value={category}
            className=" my-1"
            name=""
            id="category"
          >
            <option value="Select category">Select category</option>
            {allcategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <button onClick={handleAddProduct} className="btn btn-primary">
            Add Product
          </button>
        </div>
        <div id="category" className=" d-flex flex-column   ">
          <input
            onChange={(e) => dispatch(changeCategoryName(e.target.value))}
            value={categoryName}
            className=" my-1"
            type="text"
            name=""
            placeholder="Enter name"
          />
          <button onClick={handleAddCategory} className="btn btn-primary">
            Add Category
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
