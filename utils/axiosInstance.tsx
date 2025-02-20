import axios, { AxiosInstance } from 'axios';

const ipAddresses = [
  'http://127.0.0.1:5000/',
  'http://10.10.73.26:5000/'
];




const createAxiosInstance = (ip: string): AxiosInstance => {
  return axios.create({
    baseURL: ip,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

let base_URL = 'http://127.0.0.1:5000'; 

const getResponsiveAxiosInstance = async (): Promise<AxiosInstance | null> => {
  for (const ip of ipAddresses) {
    const instance = createAxiosInstance(ip);
    try {
      await instance.get('/api/get-kodeks');
      console.log(`Successful connection to ${ip}`);
      base_URL = ip; 
      return instance; 
    } catch (error: any) {
      console.error(`No response from ${ip}: ${error.message}`);
    }
  }
  return null; 
};

const axiosInstance = await getResponsiveAxiosInstance();
console.log(`Using base URL: ${base_URL}`);

base_URL = base_URL.replace(/\/$/, "");
export { base_URL }; 
export default axiosInstance;