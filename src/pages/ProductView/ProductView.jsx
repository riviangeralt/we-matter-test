import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductThunk,
  getSingleProductSliceSelector,
  getSingleProductThunk,
} from "../../reduxtoolkit/slices/products";
import { Error, Loading, Modal } from "../../components";
import classes from "./ProductView.module.css";
import { useParams, useNavigate } from "react-router-dom";

const ProductView = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(getSingleProductSliceSelector);
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const fetchProductDetails = async (id) => {
    try {
      await dispatch(getSingleProductThunk(id)).unwrap();
    } catch (error) {
      console.error("Error in fetchProductDetails", error);
    }
  };

  const handleProductEdit = () => {
    navigate(`/edit-product/${productId}`);
  };

  const handleProductDelete = async() => {
    try {
      await dispatch(deleteProductThunk(productId)).unwrap()
      setOpenDeleteModal(false);
    } catch (error) {
        console.error("Error in handleProductDelete", error);
    }
  }

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error handleRetry={() => fetchProductDetails(productId)} />;
  }

  return (
    <>
      {openDeleteModal && (
        <Modal
          onClose={() => setOpenDeleteModal(false)}
          title="Delete Product"
        >
          Are you sure you want to delete this product?
          <div className={classes.buttons}>
            <button onClick={() => setOpenDeleteModal(false)}>Cancel</button>
            <button onClick={handleProductDelete} className={classes.delete}>Delete</button>
          </div>
        </Modal>
      )}
      <div className={classes.container}>
        <div className={classes.product_image}>
          <img src={data?.image} alt={data?.title} />
        </div>
        <div className={classes.product_info}>
          <button onClick={() => setOpenDeleteModal(true)}>Delete Product</button>
          <button onClick={handleProductEdit}>Edit Product</button>
          <span className={classes.category}>
            Category {">"} {data?.category}
          </span>
          <span className={classes.title}>{data?.title}</span>
          <span className={classes.description}>{data?.description}</span>
          <span className={classes.price}>${data?.price}</span>
        </div>
      </div>
    </>
  );
};

export default ProductView;
