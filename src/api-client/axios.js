import axios from "axios";

const fakeStoreApi = axios.create({
  baseURL: "https://fakestoreapi.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default fakeStoreApi;
