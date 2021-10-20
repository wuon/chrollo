import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://gogoanime.vc';

const gogoanimeClient: AxiosInstance = axios.create({
  baseURL: BASE_URL
});

export default gogoanimeClient;
