import axios from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';

export const API_URL = 'https://jwt-auth-server-1sa6.onrender.com/';

const $api = axios.create({
  withCredentials:true,
  baseURL: API_URL
})

$api.interceptors.request.use((config)=>{
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
})

$api.interceptors.response.use((config)=>{
  return config;
}, async (error) => {
  const originalReq = error.config;
  if(error.response.status === 401 && error.config && !error.config._isRetry ) {
    originalReq._isRetry = true;
    try{
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
      localStorage.setItem('token', response.data.accessToken);
      return $api.request(originalReq);
    } catch(e) {
      console.log('Не авторизован');
    }
  }
  throw error;
})

export default $api;