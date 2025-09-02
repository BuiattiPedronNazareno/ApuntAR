'use client';

import { getNotas, Nota } from '@/lib/nota';
import { useEffect, useState } from "react";
import NoteCard from "@/componentes/NoteCard";
import { Box, Container, Typography, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { getMaterias } from '@/lib/materia';

export default function Home() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState(true);
   const [materiasMap, setMateriasMap] = useState<Record<number, string>>({});

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
      
      {notas.length > 0 ? (
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 0.1fr))",
          justifyContent: "center",
          gap: 4,
        }}>
          {notas.map((nota)=> (
            <Box 
              key={nota.id} 
              sx={{ 
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
    </Container>
  );
}
