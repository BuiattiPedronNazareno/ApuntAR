import { api } from './api';


export const getMateriasPorUsuario = async (usuarioID: number) => {
  const response = await api.get(`/materias/usuario/${usuarioID}`);
  return response.data;
};