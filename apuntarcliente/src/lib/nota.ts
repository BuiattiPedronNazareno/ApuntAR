import { api } from './api';

export interface Nota {
    id: number;
    titulo: string;
    contenido: string;
    prioridad: string;
    fechaCreacion: string;
    materia?: {
        id: number;
        nombre?: string;
        nivel?: string;
        nivelAcademico?: string;
    };
}

export interface Materia {
    id: number;
    nombre: string;
    nivel: string;
    nivelAcademico: string;
}

interface AxiosErrorLike {
    response?: {
        status?: number;
    };
}

function isAxiosErrorLike(error: unknown): error is AxiosErrorLike {
    return typeof error === 'object' && error !== null && 'response' in error;
}

export const getNotas = async (): Promise<Nota[]> => {
    const response = await api.get<Nota[]>('/notas');
    return response.data;
};

export const createNota = async (nota: 
  {
    titulo: string;
    contenido: string;
    prioridad: string;
    materiaID: number;
  }): Promise<Nota> => {
    const response = await api.post<Nota>('/notas', {
        titulo: nota.titulo,
        contenido: nota.contenido,
        prioridad: nota.prioridad,
        fechaCreacion: new Date().toISOString().split("T")[0], 
        materia: { id: nota.materiaID } 
    });
    return response.data;
};

export const getNotaById = async (id: number): Promise<Nota> => {
    const response = await api.get<Nota>(`/notas/${id}`);
    return response.data;
};

export const checkTituloUnico = async (titulo: string, materiaID?: number): Promise<boolean> => {
  try {
    const params: { titulo: string; materiaID?: number } = { titulo };
    if (materiaID !== undefined && materiaID !== null) {
      params.materiaID = materiaID;
    }
    
    const response = await api.get(`/notas/check-titulo`, { params });
    return response.data?.isUnique ?? true;
  } catch (error: unknown) {
    console.error('Error checking title uniqueness:', error);
    if (isAxiosErrorLike(error) && error.response?.status === 422) {
      return false;
    }
    if (isAxiosErrorLike(error) && error.response?.status === 404) {
      return true;
    }
    throw new Error('Error al verificar el título. Por favor, intente nuevamente.');
  }
};