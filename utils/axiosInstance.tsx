import axios, { AxiosInstance} from 'axios';

export const base_URL = 'http://10.10.73.49:9000';

interface MyResponseType {
  id: number;
  name: string;
}


const axiosInstance: AxiosInstance = axios.create({
  baseURL: base_URL,
  timeout: 1000, 
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;