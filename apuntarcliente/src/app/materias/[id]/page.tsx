'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Box, Button, Typography, CircularProgress, Fab } from "@mui/material";
import { getNotas, Nota } from "@/lib/nota";
import NoteCard from "@/componentes/NoteCard";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function NotasPorMateria() {
  const { id } = useParams<{ id: string }>();
  const [notas, setNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const data = await getNotas();
        const filtradas = data.filter(nota => nota.materia?.id === Number(id));
        setNotas(filtradas);
      } catch (error) {
        console.error("Error fetching notas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotas();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Notas de la materia
        </Typography>

        <Button
          variant="outlined"
          color="primary"
          component={Link}
          href="/materias"
          startIcon={<VisibilityIcon />}
        >
          Ver Materias
        </Button>
      </Box>

      {notas.length > 0 ? (
        <Box sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 3
        }}>
          {notas.map((nota) => (
            <NoteCard
              key={nota.id}
              id={nota.id}
              titulo={nota.titulo}
              prioridad={nota.prioridad}
              materiaNombre={nota.materia?.nombre ?? "Sin materia"}
            />
          ))}
        </Box>
      ) : (
        <Typography variant="h6" color="text.secondary" sx={{ mt: 4 }}>
          No hay notas en esta materia
        </Typography>
      )}

      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          textAlign: "center"
        }}
      >
        <Fab component={Link} href="/" sx={{ boxShadow: 3, mb: 0.5 }}>
          <HomeIcon />
        </Fab>
        <Typography variant="caption" sx={{ display: "block", textAlign: "center" }}>Home</Typography>
      </Box>
    </Container>
  );
}
