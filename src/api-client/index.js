import fakeStoreApi from "./axios";
import { routes } from "./routes";

export const getAllProducts = (body) => {
  let queryString = "";
  if (body) {
    queryString = new URLSearchParams(body || {}).toString();
  }
  return fakeStoreApi({
    url: `${routes.GET_ALL_PRODUCTS.URL}?${queryString}`,
    method: routes.GET_ALL_PRODUCTS.METHOD,
  });
};

export const getSingleProduct = (id) => {
  let url = routes.GET_SINGLE_PRODUCT.URL;
  if (id) {
    url += `/${id}`;
  }
  return fakeStoreApi({
    url,
    method: routes.GET_SINGLE_PRODUCT.METHOD,
  });
};

export const createProduct = (product) => {
  return fakeStoreApi({
    url: routes.CREATE_PRODUCT.URL,
    method: routes.CREATE_PRODUCT.METHOD,
    data: product,
  });
};

export const updateProduct = (body) => {
  const { id, ...rest } = body;
  let url = routes.UPDATE_PRODUCT.URL;
  if (id) {
    url += `/${id}`;
  }
  return fakeStoreApi({
    url,
    method: routes.UPDATE_PRODUCT.METHOD,
    data: rest,
  });
};

export const deleteProduct = (id) => {
  let url = routes.DELETE_PRODUCT.URL;
  if (id) {
    url += `/${id}`;
  }
  return fakeStoreApi({
    url,
    method: routes.DELETE_PRODUCT.METHOD,
  });
};

export const getAllUsers = () => {
  return fakeStoreApi({
    url: routes.GET_ALL_USERS.URL,
    method: routes.GET_ALL_USERS.METHOD,
  });
};

export const getSingleUser = (id) => {
  return fakeStoreApi({
    url: routes.GET_SINGLE_USER.URL,
    method: routes.GET_SINGLE_USER.METHOD,
    params: { id },
  });
};

export const createUser = (user) => {
  return fakeStoreApi({
    url: routes.CREATE_USER.URL,
    method: routes.CREATE_USER.METHOD,
    data: user,
  });
};

export const updateUser = (id, user) => {
  return fakeStoreApi({
    url: routes.UPDATE_USER.URL,
    method: routes.UPDATE_USER.METHOD,
    params: { id },
    data: user,
  });
};

export const deleteUser = (id) => {
  return fakeStoreApi({
    url: routes.DELETE_USER.URL,
    method: routes.DELETE_USER.METHOD,
    params: { id },
  });
};
