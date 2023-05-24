import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createProductThunk,
  getSingleProductThunk,
  updateProductThunk,
} from "../../reduxtoolkit/slices/products";
import classes from "./AddProduct.module.css";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [values, setValues] = useState({});
  const [message, setMessage] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const data = new FormData(e.target);
      const parsedData = Object.fromEntries(data);
      parsedData["image"] = "https://i.pravatar.cc";
      if (id) {
        await dispatch(
          updateProductThunk({
            id,
            ...parsedData,
          })
        ).unwrap();
        setMessage("Product updated successfully");
      } else {
        await dispatch(createProductThunk(parsedData)).unwrap();
        setMessage("Product added successfully");
      }
    } catch (error) {
      console.error("Error in onSubmitHandler", error);
    }
  };

  const fetchProductDetails = async (id) => {
    try {
      const res = await dispatch(getSingleProductThunk(id)).unwrap();
      setValues(res);
    } catch (error) {
      console.error("Error in fetchProductDetails", error);
    }
  };

  const handleValuesChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, []);

  return (
    <div className={classes.product_form}>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          required
          value={values.title}
          onChange={handleValuesChange}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          required
          value={values.description}
          onChange={handleValuesChange}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          required
          value={values.price}
          onChange={handleValuesChange}
        />
        <input
          type="text"
          placeholder="Category"
          name="category"
          required
          value={values.category}
          onChange={handleValuesChange}
        />
        <button type="submit">{id ? "Update Product" : "Add Product"}</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default AddProduct;
