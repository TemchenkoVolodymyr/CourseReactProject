import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';


export const registration = async (email, password, userName) => {
  const { data } = await $host.post('api/user/registration', { email, password, userName,  role: 'ADMIN' });
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password });
  localStorage.setItem('token', data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const response = await $authHost.get('api/user/auth');
  localStorage.setItem('token', response.data.token);
  const decoded = jwt_decode(response.data.token);
  return {
    ...decoded,
    createdAt: response.data.createdAt
  };
};


