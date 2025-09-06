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


api.interceptors.response.use(response => response, error => {
  //console.error('API Error completo:', error);
  if (error.response?.status !== 422) {
    const errorDetails = {
      url: error.config?.url || 'URL no disponible',
      status: error.response?.status || 'Estado no disponible',
      data: error.response?.data || 'Datos no disponibles',
      message: error.message || 'Mensaje no disponible',
      stack: error.stack || 'Stack no disponible'
    };

    if (process.env.NODE_ENV === 'development') {
      //console.error('API Error detallado:', JSON.stringify(errorDetails, null, 2));
    }

    if (error.response?.status === 500) {
      console.error('Error 500 detectado - Verifica el backend');
      return Promise.reject(new Error('Error interno del servidor. Por favor, intente nuevamente.'));
    }

    if (error.response?.status === 400) {
      const data = error.response.data;

      if (data?.mensaje?.includes("título ya existe") || data?.codigo === "TITULO_DUPLICADO") {
        return Promise.reject(new Error("El título ya existe para esta materia"));
      }

      if (data?.error?.includes("El nombre de la materia ya está registrado")) {
        return Promise.reject(new Error(data.error));
      }

      if (data?.mensaje) {
        return Promise.reject(new Error(data.mensaje));
      }

      if (data?.error) {
        return Promise.reject(new Error(data.error));
      }

      if (data?.codigo === "MATERIA_DUPLICADA") {
        return Promise.reject(new Error(data.mensaje || "El nombre de la materia ya está registrado"));
      }

      return Promise.reject(new Error(data.mensaje || data.error || "Solicitud incorrecta."));
    }

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
