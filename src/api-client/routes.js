const productRoutes = {
  GET_ALL_PRODUCTS: {
    URL: "/products",
    METHOD: "GET",
  },
  GET_SINGLE_PRODUCT: {
    URL: "/products",
    METHOD: "GET",
  },
  CREATE_PRODUCT: {
    URL: "/products",
    METHOD: "POST",
  },
  UPDATE_PRODUCT: {
    URL: "/products",
    METHOD: "PUT",
  },
  DELETE_PRODUCT: {
    URL: "/products",
    METHOD: "DELETE",
  }
};

const userRoutes = {
  GET_ALL_USERS: {
    URL: "/users",
    METHOD: "GET",
  },
  GET_SINGLE_USER: {
    URL: "/users",
    METHOD: "GET",
  },
  CREATE_USER: {
    URL: "/users",
    METHOD: "POST",
  },
  UPDATE_USER: {
    URL: "/users",
    METHOD: "PUT",
  },
  DELETE_USER: {
    URL: "/users",
    METHOD: "DELETE",
  }
};

export const routes = {
  ...productRoutes,
  ...userRoutes,
};
