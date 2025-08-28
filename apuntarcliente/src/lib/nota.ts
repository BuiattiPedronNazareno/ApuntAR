import { api } from './api';

export interface Nota {
    id: number;
    titulo: string;
    contenido: string;
    prioridad: string;
    fechaCreacion: Date;
    materiaID: number;
}

export interface Materia {
    id: number;
    nombre: string;
    nivel: string;
    nivelAcademico: string;
}

export const getNotas = async (): Promise<Nota[]> => {
    const response = await api.get<Nota[]>('/notas');
    return response.data;
};

export const createNota = async (nota: Omit<Nota, 'id' | 'fechaCreacion'>): Promise<Nota> => {
    const response = await api.post<Nota>('/notas', nota);
    return response.data;
};

export const getNotaById = async (id: number): Promise<Nota> => {
    const response = await api.get<Nota>(`/notas/${id}`);
    return response.data;
};

export const getMateriasPorUsuario = async (usuarioId: number): Promise<Materia[]> => {
    const response = await api.get(`/materias/usuario/${usuarioId}`);
    return response.data;
};

export const checkTituloUnico = async (titulo: string, usuarioId: number): Promise<boolean> => {
    try {
        const response = await api.get(`/notas/check-titulo`, {
        params: { titulo, usuarioId }
        });
        return response.data.isUnique;
    } catch (error) {
        console.error('Error checking title uniqueness:', error);
        return false;
    }
};