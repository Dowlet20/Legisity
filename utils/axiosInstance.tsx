import axios, { AxiosInstance } from 'axios';

const ipAddresses = [
	'http://10.20.7.42:5000/',
  'http://10.20.8.42:5000/',
	'http://10.10.73.26:5000/',
];

const createAxiosInstance = (ip: string): AxiosInstance => {
  return axios.create({
    baseURL: ip,
    timeout: 4000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

let base_URL = 'http://127.0.0.1:5000';

const getResponsiveAxiosInstance = async (): Promise<AxiosInstance | null> => {
  const checkIp = async (ip: string) => {
    const instance = createAxiosInstance(ip);
    try {
      await instance.get('/api/get-kodeks');
      return { ip, instance };
    } catch (error: any) {
      throw error;
    }
  };

  try {
    const firstResponse = await Promise.race(
      ipAddresses.map(ip => checkIp(ip))
    );
    
    if (firstResponse) {
      const { ip, instance } = firstResponse;
      base_URL = ip;
      return instance;
    }
  } catch (error) {
    console.error('All connections failed');
  }

  return null;
};

const axiosInstance = await getResponsiveAxiosInstance();

base_URL = base_URL.replace(/\/$/, "");
export { base_URL };
export default axiosInstance;