import { webApiUrl } from "../environments/environment";
import { setCookie } from "../services/cookie.service";
import { post, get, put, remove } from "./fetchHelpers";

const buildUrl = (entity, id = "") =>
  `${webApiUrl}${entity}${id ? "/" + id : ""}`;

export const getDatas = async (entity) => get(buildUrl(entity));
export const getDatasById = async (entity, id) => get(buildUrl(entity, id));
export const addData = async (entity, values) => post(buildUrl(entity), values);

export const updateData = async (entity, values) => {
  const id = values instanceof FormData ? values.get("id") : values.id;
  return put(buildUrl(entity, id), values);
};

export const deleteData = async (entity, id) => remove(buildUrl(entity, id));

export const signup = async (user) => {
  const datas = await post(buildUrl("auth/register"), user);
  if (datas.data.token) {
    setCookie("auth", {
      token: datas.data.token,
      user: datas.data.user,
    });
  }
  return datas;
};

export const signin = async (user) => {
  const datas = await post(buildUrl("auth/login"), user);
  if (datas.data.token) {
    setCookie("auth", {
      token: datas.data.token,
      user: datas.data.user,
    });
  }
  return datas;
};
export const logout = async (user) => post(buildUrl("logout"), user);

export const forgotpassword = async (user) =>
  post(buildUrl("password/forgot"), user);
export const resetpassword = async (user) =>
  post(buildUrl("password/reset"), user);
