import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const apiRequest = async (
  path: string,
  method: string,
  body?: object
): Promise<any> => {
  try {
    const res = await axiosInstance({
      method: method,
      url: path,
      data: body === undefined ? {} : body,
    });

    return res;
  } catch (err: any) {
    console.log(err.message);
    return err;
  }
};
