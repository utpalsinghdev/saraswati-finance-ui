import axios from "axios";
import { toast } from "react-hot-toast";
import Cookie from "js-cookie";
const unauthorizedCode = [401];
const TOKEN_TYPE = "Bearer ";
const REQUEST_HEADER_AUTH_KEY = "Authorization";
const BaseService = axios.create({
  timeout: 60000,
  baseURL: import.meta.env.VITE_BASE_URL,
});
BaseService.interceptors.request.use(
  (config) => {
    if (!!Cookie.get("gafs_user")) {
      const rawPersistData = JSON.parse(Cookie.get("gafs_user"));
      const accessToken = rawPersistData?.Authorization;
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
BaseService.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && unauthorizedCode.includes(response.status)) {
      Cookie.remove("gafs_user");
      toast.error("Session Expired !!");
      if (!!Cookie.get("gafs_agent")) {
        window.location.href = "/agent/login";
      } else {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export default BaseService;
