import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error, Loading } from "../../components";
import {
  getAllProductsSliceSelector,
  getAllProductsThunk,
} from "../../reduxtoolkit/slices/products";
import classes from "./ProductsList.module.css";
import { useNavigate } from "react-router-dom";

const ProductsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { data, loading, error } = useSelector(getAllProductsSliceSelector);

  const fetchProductsList = async () => {
    try {
      const res = await dispatch(getAllProductsThunk()).unwrap();
      setFilteredProducts(res);
    } catch (error) {
      console.error("Error in fetchProductsList", error);
    }
  };

  const handleProductView = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  }

  const handleFilterChange = (e) => {
    const { value } = e.target;
    if (value === "all") {
      setFilteredProducts(data);
      return;
    } else {
      setFilteredProducts(data.filter((product) => product.category === value));
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value === "") {
      setFilteredProducts(data);
      return;
    } else {
      setFilteredProducts(filteredProducts.filter((product) => product.title.toLowerCase().includes(value.toLowerCase())))
    }
  }

  useEffect(() => {
    fetchProductsList();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.product_filter}>
        <input type="text" placeholder="Search for products" onChange={handleInputChange} />
        <select
          className={classes.select}
          defaultValue="all"
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          {[...new Set(data?.map((product) => product.category))].map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>
        <button className={classes.add_product} onClick={handleAddProduct}>Add Product</button>
      </div>
      <div className={classes.products_grid}>
        {filteredProducts?.length > 0 ? filteredProducts?.map((product) => (
          <div
            key={product.id}
            className={classes.product}
            onClick={() => handleProductView(product.id)}
          >
            <img
              src={product.image}
              alt={product.title}
              className={classes.image}
            />
            <div className={classes.info}>
              <span className={classes.title}>{product.title}</span>
              <span className={classes.price}>${product.price}</span>
            </div>
          </div>
        )) : "No products found"}
      </div>
    </div>
  );
};

export default ProductsList;
