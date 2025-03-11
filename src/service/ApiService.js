import axios from "axios";
import { responseHandler } from "./ApiResponseHandler";
import { useAuth } from "@/stores/auth";

const backendApiUrl = import.meta.env.v_API_URL;

export default class ApiService {
  api;
  _initApi(baseURL) {
    this.api = axios.create({
      // withCredentials: true,
      baseURL,
      // timeout: 3000,
      validateStatus: (status) => {
        return status >= 200 && status < 300;
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  constructor(baseURL) {
    if (baseURL) this._initApi(baseURL);
    else this._initApi(backendApiUrl);
  }
  /**
   *
   * @param {string} url
   * @param {Object} config
   * @returns
   */
  async get(url, config = {}) {
    return await responseHandler(
      this.api({
        ...config,
        url,
        method: "get",
      })
    );
  }

  async post(url, data, config = {}) {
    console.log('sdfsdf');

    return await responseHandler(
      this.api({
        ...config,
        url,
        data,
        method: "post",
      })
    );
  }

  async put(url, data, config = {}) {
    return await responseHandler(
      this.api({
        ...config,
        url,
        data,
        method: "put",
      })
    );
  }

  async patch(url, data, config = {}) {
    return await responseHandler(
      this.api({
        ...config,
        url,
        data,
        method: "patch",
      })
    );
  }

  async delete(url, config = {}) {
    return await responseHandler(
      this.api({
        ...config,
        url,
        method: "delete",
      })
    );
  }

  addAuthenticationHeader() {
    const authStore = useAuth();
    this.api.defaults.headers.common.Authorization = `Bearer ${authStore.auth?.accessToken}`;
    return this;
  }
}
