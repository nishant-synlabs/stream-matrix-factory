export const API_BASE_URL = "";

export const API_ENDPOINTS = {
  GET_PRODUCTS: () => API_BASE_URL + "/api/products",
  GET_PRODUCTS_ID: (id) => API_BASE_URL + "/api/products/" + id + "",
  POST_PRODUCTS: () => API_BASE_URL + "/api/products",
  PUT_PRODUCTS_ID: (id) => API_BASE_URL + "/api/products/" + id + "",
  DELETE_PRODUCTS_ID: (id) => API_BASE_URL + "/api/products/" + id + "",
  GET_CATEGORIES: () => API_BASE_URL + "/api/categories",
  POST_CATEGORIES: () => API_BASE_URL + "/api/categories",
  PUT_CATEGORIES_ID: (id) => API_BASE_URL + "/api/categories/" + id + "",
  DELETE_CATEGORIES_ID: (id) => API_BASE_URL + "/api/categories/" + id + ""
};
