import axios from "axios";

const baseURL = "http://localhost:8080";

export const axiosInstance = axios({ baseURL });
