'use client';

import { getNotas, Nota, deleteNota } from '@/lib/nota';
import { useEffect, useState } from "react";
import NoteCard from "@/componentes/NoteCard";
import { Box, Select, MenuItem, FormControl, InputLabel, Container, Typography, Button, Fab, CircularProgress, IconButton } from "@mui/material";
import Link from "next/link";
import { getMaterias } from '@/lib/materia';
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function Home() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState(true);
  const [materiasMap, setMateriasMap] = useState<Record<number, string>>({});

  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedNotas, setSelectedNotas] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState("fechaDesc");

  const sortNotas = (notas: Nota[], option: string) => {
    return [...notas].sort((a, b) => {
      switch (option) {
        case "tituloAsc":
          return a.titulo.localeCompare(b.titulo);
        case "tituloDesc":
          return b.titulo.localeCompare(a.titulo);
        case "prioridadAsc": {
          const order: Record<"BAJA" | "MEDIA" | "ALTA", number> = { 
            BAJA: 1, 
            MEDIA: 2, 
            ALTA: 3 
          };
          return order[a.prioridad as "BAJA" | "MEDIA" | "ALTA"] - order[b.prioridad as "BAJA" | "MEDIA" | "ALTA"];
        }
        case "prioridadDesc": {
          const order: Record<"BAJA" | "MEDIA" | "ALTA", number> = { 
            BAJA: 1, 
            MEDIA: 2, 
            ALTA: 3 
          };
          return order[b.prioridad as "BAJA" | "MEDIA" | "ALTA"] - order[a.prioridad as "BAJA" | "MEDIA" | "ALTA"];
        }
        case "fechaAsc":
          return new Date(a.fechaCreacion).getTime() - new Date(b.fechaCreacion).getTime();
        case "fechaDesc":
          return new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime();
        case "materiaAsc":
          return (a.materia?.nombre ?? "").localeCompare(b.materia?.nombre ?? "");
        case "materiaDesc":
          return (b.materia?.nombre ?? "").localeCompare(a.materia?.nombre ?? "");
        default:
          return 0;
      }
    });
  };

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const materiasData = await getMaterias();
        const materiasMap = materiasData.reduce((map, materia) => {
          map[materia.id] = materia.nombre;
          return map;
        }, {} as Record<number, string>);
        setMateriasMap(materiasMap);
        const data = await getNotas();
        setNotas(data);
      } catch (error){
        console.error('Error fetching notas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotas();
  }, []);

  const toggleSelect = (id: number) => {
    setSelectedNotas(prev =>
      prev.includes(id) ? prev.filter(notaId => notaId !== id) : [...prev, id]
    );
  };

  const handleStartSelecting = () => {
    setIsSelecting(true);
    setSelectedNotas([]);
  };

  const handleCancel = () => {
    setIsSelecting(false);
    setSelectedNotas([]);
  };

  const handleConfirmDelete = async () => {
    try {
      for (const id of selectedNotas) {
        await deleteNota(id);
      }
      setNotas(prev => prev.filter(nota => !selectedNotas.includes(nota.id)));
      setIsSelecting(false);
      setSelectedNotas([]);
    } catch (error) {
      console.error("Error eliminando notas:", error);
      alert("No se pudo eliminar las notas seleccionadas.");
    }
  };

  if (loading) {
      return (
          <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
          </Container>
      )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Mis Notas
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href="/materias/crear"
            sx={{ 
              backgroundColor: '#142044',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: '#050f28',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
              }
            }}
          >
            + Agregar Materia
          </Button>
          <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/notas/crear"
              sx={{ 
                backgroundColor: '#142044',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                '&:hover': {
                  backgroundColor: '#050f28',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                }
              }}
            >
              + Nueva Nota
            </Button>
          </Box>
      </Box>

      <FormControl sx={{ minWidth: 180, mb: 5 }}>
        <InputLabel>Ordenar por</InputLabel>
        <Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          label="Ordenar por"
        >
          <MenuItem value="tituloAsc">Título (A-Z)</MenuItem>
          <MenuItem value="tituloDesc">Título (Z-A)</MenuItem>
          <MenuItem value="prioridadAsc">Prioridad (Baja → Alta)</MenuItem>
          <MenuItem value="prioridadDesc">Prioridad (Alta → Baja)</MenuItem>
          <MenuItem value="fechaAsc">Fecha (Antigua → Reciente)</MenuItem>
          <MenuItem value="fechaDesc">Fecha (Reciente → Antigua)</MenuItem>
          <MenuItem value="materiaAsc">Materia (A-Z)</MenuItem>
          <MenuItem value="materiaDesc">Materia (Z-A)</MenuItem>
        </Select>
      </FormControl>
      
      {notas.length > 0 ? (
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 0.1fr))",
          justifyContent: "center",
          gap: 4,
        }}>
          {sortNotas(notas, sortOption).map((nota)=> (
            <Box 
              key={nota.id} 
              sx={{ 
                position: "relative",
                display: "flex", 
                justifyContent: "center"  
              }}
            >
              <NoteCard
                id={nota.id}
                titulo={nota.titulo}
                prioridad={nota.prioridad}
                materiaNombre={nota.materia?.nombre ?? "Sin materia"}
              />

              {isSelecting && (
                <IconButton
                  onClick={() => toggleSelect(nota.id)}
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    borderRadius: "50%",
                    boxShadow: 8,
                    border: "2px solid #252525ff",
                  }}
                >
                  {selectedNotas.includes(nota.id) ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <RadioButtonUncheckedIcon color="action" />
                  )}
                </IconButton>
              )}
            </Box>
          ))}
        </Box>
      ) : (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="h6" color="textSecondary">
                  No tienes notas creadas aún
              </Typography>
              <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  href="/notas/crear"
                  sx={{ mt: 2 }}
              >
                  Crear tu primera nota
              </Button>
          </Box>
      )}


      {!isSelecting && (
        <Box
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Fab
              component={Link}
              href="/materias"
              sx={{ boxShadow: 3, mb: 0.5 }}
            >
              <VisibilityIcon />
            </Fab>
            <Typography variant="caption" sx={{ display: "block", textAlign: "center" }}>
              Materias
            </Typography>
          </Box>

          <Fab onClick={handleStartSelecting} sx={{ boxShadow: 3 }}>
            <DeleteIcon />
          </Fab>

        </Box>
      )}

      {isSelecting && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
          <Button 
            variant="contained" 
            color="error"
            onClick={handleConfirmDelete}
            disabled={selectedNotas.length === 0}
          >
            Aceptar
          </Button>
          <Button 
            variant="outlined" 
            color="primary"
            onClick={handleCancel}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              if (confirm("⚠️ Esto eliminará TODAS tus notas. ¿Desea continuar?")) {
                try {
                  for (const nota of notas) {
                    await deleteNota(nota.id);
                  }
                  setNotas([]);
                  setIsSelecting(false);
                  setSelectedNotas([]);
                } catch (error) {
                  console.error("Error eliminando todas las notas:", error);
                  alert("No se pudieron eliminar todas las notas.");
                }
              }
            }}
          >
            Eliminar todas
          </Button>
        </Box>
      )}
    </Container>
  );
}
