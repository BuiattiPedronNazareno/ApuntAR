import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(response => {
  if (Array.isArray(response.data)) {
    return {
      ...response,
      data: response.data.map(nota => ({
        ...nota,
        fechaCreacion: nota.fechaCreacion ? new Date(nota.fechaCreacion) : null
      }))
    };
  } 
  else if (response.data && response.data.fechaCreacion) {
    return {
      ...response,
      data: {
        ...response.data,
        fechaCreacion: new Date(response.data.fechaCreacion)
      }
    };
  }
  
  return response;
});


api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      stack: error.stack
    });

    if (!error.response) {
      console.error('Network Error - Verifica que el backend esté funcionando y la URL sea correcta');
      return Promise.reject({
        ...error,
        message: 'No se pudo conectar con el servidor. Verifica que el backend esté funcionando.'
      });
    }
    if (error.response?.status === 403) {
      console.error('Acceso denegado - Verifica tus roles de usuario');
      return Promise.reject({
        ...error,
        message: 'No tienes permisos para acceder a este recurso.'
      });
    }

    return Promise.reject(error);
  }
);

export const verifyToken = async (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
