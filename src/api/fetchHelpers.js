import axios from "axios";
import { getCookie } from "../services/cookie.service";
/* import { getToken } from "../helpers/utils"; */

const getAuthToken = () => {
  const auth = getCookie("auth");
  return auth?.token ? `Bearer ${auth.token}` : "";
};

const request = async (method, url, data = null, options = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAuthToken(),
        ...options.headers,
      },
      ...options,
    });
    return { isSuccess: true, data: response.data };
  } catch (error) {
    return {
      isSuccess: false,
      error: error.response ? error.response.data : error.message,
    };
  }
};

export const get = (url, options) => request("GET", url, null, options);
export const post = (url, data, options) => request("POST", url, data, options);
export const put = (url, data, options) => request("PUT", url, data, options);
export const remove = (url, options) => request("DELETE", url, null, options);

//import { getCookie } from "../services/cookie.service";

/* const getAuthToken = () => {
  const auth = getCookie("auth");
  return auth?.token ? `Bearer ${auth.token}` : "";
}; */

/* const request = async (method, url, data = null, options = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        Accept: "application/json",
        //Authorization: getAuthToken(),
        "Content-Type": "multipart/form-data",
        ...options.headers,
      },
    });
    return { isSuccess: true, data: response.data };
  } catch (error) {
    return {
      isSuccess: false,
      error: error.response ? error.response.data : error.message,
    };
  }
};

export const get = (url, options) => request("get", url, null, options);
export const post = (url, data, options) => request("post", url, data, options);
export const put = (url, data, options) => request("put", url, data, options);
export const deleted = (url, data, options) =>
  request("delete", url, data, options); */
