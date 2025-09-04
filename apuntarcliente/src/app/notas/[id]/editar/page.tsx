'use client';

import { useRouter, useParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from "react";
import { Container, Box, TextField, Button, Alert, CircularProgress, Snackbar, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getNotaById, updateNota, checkTituloUnico, Nota } from '@/lib/nota';
import { getMaterias, Materia } from '@/lib/materia';

export default function EditarNota() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const notaId = Number(id);
  console.log("ID capturado:", id, "Parseado:", notaId);

  const [notaOriginal, setNotaOriginal] = useState<Nota | null>(null);

  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [prioridad, setPrioridad] = useState<'ALTA' | 'MEDIA' | 'BAJA'>('MEDIA');
  const [materiaID, setMateriaID] = useState<number | ''>('');
  const [materias, setMaterias] = useState<Materia[]>([]);

  const [tituloError, setTituloError] = useState('');
  const [contenidoError, setContenidoError] = useState('');
  const [materiaError, setMateriaError] = useState('');
  const [tituloValidating, setTituloValidating] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [tituloTouched, setTituloTouched] = useState(false);
  const [contenidoTouched, setContenidoTouched] = useState(false);
  const [materiaTouched, setMateriaTouched] = useState(false);

  useEffect(() => {
    if (!notaId || Number.isNaN(notaId)) {
      console.error("ID inválido en la URL:", id);
      return;
    }
    const fetchData = async () => {
      try {
        const notaData = await getNotaById(notaId);

        setNotaOriginal(notaData);
        setTitulo(notaData.titulo);
        setContenido(notaData.contenido);
        setPrioridad(notaData.prioridad as 'ALTA' | 'MEDIA' | 'BAJA');
        setMateriaID(notaData.materia?.id ?? '');
      } catch (err) {
        console.error("Error al cargar nota:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const validateForm = async () => {
    let isValid = true;

    if (!titulo.trim()) {
      setTituloError('El título es obligatorio');
      isValid = false;
    } else if (titulo.length < 3) {
      setTituloError('El título debe tener al menos 3 caracteres');
      isValid = false;
    } else {
      setTituloValidating(true);
      try {
        const isUnique = await checkTituloUnico(
          titulo,
          materiaID ? Number(materiaID) : undefined,
          notaId
        );
        if (!isUnique) {
          setTituloError('El título ya existe para esta materia');
          isValid = false;
        } else {
          setTituloError('');
        }
      } catch (err: unknown) {
        setTituloError('Error al verificar el título');
        isValid = false;
      } finally {
        setTituloValidating(false);
      }
    }

    if (!contenido.trim()) {
      setContenidoError('El contenido es obligatorio');
      isValid = false;
    } else {
      setContenidoError('');
    }

    if (!materiaID) {
      setMateriaError('Debe seleccionar una materia');
      isValid = false;
    } else {
      setMateriaError('');
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTituloTouched(true);
    setContenidoTouched(true);
    setMateriaTouched(true);

    const isValid = await validateForm();
    if (!isValid || !notaOriginal) return;

    setSubmitting(true);

    try {
      await updateNota(Number(id), {
        titulo,
        contenido,
        prioridad,
        materiaID: Number(materiaID) || (notaOriginal?.materia?.id),
        fechaCreacion: notaOriginal.fechaCreacion,
      });

      setSnackbarMessage('Nota actualizada exitosamente');
      setSnackbarOpen(true);

      setTimeout(() => {
        router.push(`/notas/${id}`);
      }, 1000);
    } catch (err: unknown) {
      setMateriaError('Error al actualizar la nota. Por favor, intente nuevamente.');
      setSnackbarMessage('Error al actualizar la nota. Por favor, intente nuevamente.');
      setSnackbarOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 0, p: 0 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)',
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mb: 2,
          px: 2,
          gap: 2,
        }}>
          <FormControl size="small" sx={{ minWidth: 150, height: 40 }}>
            <InputLabel>Prioridad</InputLabel>
            <Select
              value={prioridad}
              label="Prioridad"
              onChange={(e) =>
                setPrioridad(e.target.value as 'ALTA' | 'MEDIA' | 'BAJA')
              }
              disabled={submitting}
              sx={{ height: 40 }}
            >
              <MenuItem value="ALTA">Alta</MenuItem>
              <MenuItem value="MEDIA">Media</MenuItem>
              <MenuItem value="BAJA">Baja</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            variant="outlined"
            color="primary"
            onClick={() => router.back()}
            startIcon={<CloseIcon />}
          >
            Cancelar
          </Button>
        </Box>

        <Box sx={{
          display: 'flex',
          flexGrow: 1,
          gap: 2,
          height: 'calc(100% - 60px)'
        }}>
          <Card variant="outlined" sx={{
            flex: 1,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}>
            <CardContent sx={{
              flex: 1,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              '&:last-child': { pb: 2 }
            }}>
              <TextField
                value={titulo}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setTitulo(e.target.value);
                  if (tituloTouched) {
                    if (e.target.value.length < 3) {
                      setTituloError('El título debe tener al menos 3 caracteres');
                    } else {
                      setTituloError('');
                    }
                  }
                }}
                onBlur={() => setTituloTouched(true)}
                placeholder="Título de la nota"
                variant="standard"
                fullWidth
                error={!!tituloError && tituloTouched}
                helperText={tituloTouched ? tituloError : ''}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: '1.8rem',
                    fontWeight: 600,
                    '&:focus': {
                      backgroundColor: 'action.hover'
                    }
                  }
                }}
                InputLabelProps={{ shrink: false }}
              />

              <TextField
                value={contenido}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setContenido(e.target.value);
                  if (contenidoTouched && !e.target.value.trim()) {
                    setContenidoError('El contenido es obligatorio');
                  } else if (contenidoTouched) {
                    setContenidoError('');
                  }
                }}
                onBlur={() => setContenidoTouched(true)}
                multiline
                fullWidth
                placeholder="Escribe algo..."
                variant="standard"
                error={!!contenidoError && contenidoTouched}
                helperText={contenidoTouched ? contenidoError : ''}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: '1rem',
                    minHeight: 'calc(100% - 40px)',
                    '& textarea': {
                      minHeight: 'calc(100% - 40px) !important',
                      resize: 'none'
                    }
                  }
                }}
                InputLabelProps={{ shrink: false }}
                sx={{ mt: 2 }}
              />

              <Box sx={{ mt: 'auto',  display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={submitting}
                  fullWidth
                  size="large"
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: '#234e68',
                    fontWeight: 'bold',
                    py: 1.5,
                    width: 'fit-content',
                    alignSelf: 'center',
                    px: 4,
                  }}
                >
                  {submitting ? (
                    <>
                      <CircularProgress size={24} sx={{ mr: 1 }} />
                      Guardando...
                    </>
                  ) : (
                    'Guardar Nota'
                  )}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
