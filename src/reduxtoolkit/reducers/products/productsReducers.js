import {
  getAllProductsSliceReducer,
  getSingleProductSliceReducer,
  deleteProductSliceReducer,
  updateProductSliceReducer,
  createProductSliceReducer,
} from "../../slices/products";

export const productsReducers = {
  getAllProducts: getAllProductsSliceReducer,
  getSingleProduct: getSingleProductSliceReducer,
  deleteProduct: deleteProductSliceReducer,
  updateProduct: updateProductSliceReducer,
  createProduct: createProductSliceReducer,
};
