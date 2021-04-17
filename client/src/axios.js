import axios from "axios";

const instance = axios.create({
  baseURL: "https://external-apis.herokuapp.com",
});

export default instance;
