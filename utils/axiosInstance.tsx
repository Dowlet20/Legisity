import axios, { AxiosInstance } from 'axios';

export const base_URL = 'http://10.10.73.49:8000/'; 


const axiosInstance : AxiosInstance =  axios.create({
    baseURL: base_URL,
    timeout: 4000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

export default axiosInstance;