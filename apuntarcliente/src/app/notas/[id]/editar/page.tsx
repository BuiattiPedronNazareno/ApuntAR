'use client';

import { useRouter, useParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from "react";
import { Slider, Container, Box, TextField, Button, Alert, CircularProgress, Snackbar, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getNotaById, updateNota, checkTituloUnico, getNotas, Nota } from '@/lib/nota';
import { getMaterias, Materia } from '@/lib/materia';
import NotaRenderer from "@/componentes/NotaRenderer";

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

  const [todasLasNotas, setTodasLasNotas] = useState<{ id: number; titulo: string }[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [imgWidth, setImgWidth] = useState<number>(400);
  const [openTutorial, setOpenTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  const handleOpenTutorial = () => {
    setTutorialStep(0);
    setOpenTutorial(true);
  };

  const handleNextStep = () => {
    if (tutorialStep < tutorialContent.length - 1) {
      setTutorialStep((prev) => prev + 1);
    } else {
      setOpenTutorial(false);
    }
  };

  const tutorialContent = [
    {
      title: "Hipervínculos entre notas",
      content: (
        <>
          <Typography variant="body1">
            Para crear un hipervínculo a otra nota, escribí el nombre de la nota entre 
            <b> [[dobles corchetes]]</b>.  
          </Typography>
          <Box mt={2}>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              Ejemplo: [[Mi otra nota]]
            </Typography>
          </Box>
        </>
      ),
    },
    {
      title: "Modificar tamaño de imágenes",
      content: (
        <>
          <Typography variant="body1">
            Una vez que subís una imagen, podés ajustar su tamaño con el deslizador 
            que aparece debajo.  
          </Typography>
          <Box mt={2}>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              Ejemplo: arrastrá el control para cambiar el ancho de 200px a 600px.
            </Typography>
          </Box>
        </>
      ),
    },
    {
      title: "Modificar tamaño de imágenes",
      content: (
        <>
          <Typography variant="body1">
            Una vez agregada la imagen, podés ajustar su tamaño cambiándole el 
            valor numérico al size.  
          </Typography>
          <Box mt={2}>
            <Typography variant="body2" sx={{ fontStyle: "italic" }}>
              {`Ejemplo: `} <br />
                {`cambiar ![](enlace/a/la/imagen.jpg){size=500};`}<br />
                {`a ![](enlace/a/la/imagen.jpg){size=100};`} <br />
                {`y se hace más chico`}
            </Typography>
          </Box>
        </>
      ),
    },
  ];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      const url = data.url;
      setImgUrl(url);
      setImgWidth(200);

      setContenido((prev) => prev + `\n![](${url}){size=200}\n`);
    } catch (err) {
      console.error("Error subiendo imagen", err);
      setSnackbarMessage("Error al subir la imagen");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };


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

        const allNotas = await getNotas();
        setTodasLasNotas(allNotas);
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
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setTimeout(() => {
        router.push(`/notas/${id}`);
      }, 1000);
    } catch (err: unknown) {
      setMateriaError('Error al actualizar la nota. Por favor, intente nuevamente.');
      setSnackbarMessage('Error al actualizar la nota. Por favor, intente nuevamente.');
      setSnackbarSeverity('error');
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
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 2 }}>
          
          <Button sx={{
            backgroundColor: "#f5f5f5", 
            color: "#234e68",             
            border: "3px solid #234e68",   
            borderRadius: "8px",        
            fontWeight: "bold",         
            textTransform: "none",     
            "&:hover": {
              backgroundColor: "#e0e0e0", 
            },
            }} 
            onClick={handleOpenTutorial}
          >
            Cómo Usar ApuntAR
          </Button>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Prioridad</InputLabel>
            <Select
              value={prioridad}
              label="Prioridad"
              onChange={(e) => setPrioridad(e.target.value as 'ALTA' | 'MEDIA' | 'BAJA')}
              disabled={submitting}
            >
              <MenuItem value="ALTA">Alta</MenuItem>
              <MenuItem value="MEDIA">Media</MenuItem>
              <MenuItem value="BAJA">Baja</MenuItem>
            </Select>
          </FormControl>

          <Box>
            <Button variant="outlined" component="label">
              Subir imagen
              <input hidden type="file" accept="image/*" onChange={handleUpload} />
            </Button>

            {imgUrl && (
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Tamaño de imagen</Typography>
                <Slider
                  min={50}
                  max={800}
                  value={imgWidth}
                  onChange={(_, newValue) => {
                    const newSize = newValue as number;
                    setImgWidth(newSize);

                    setContenido((prev) =>
                      prev.replace(
                        new RegExp(`!\\[\\]\\(${imgUrl}\\)\\{size=\\d+\\}`),
                        `![](${imgUrl}){size=${newSize}}`
                      )
                    );
                  }}
                />
              </Box>
            )}
          </Box>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => router.back()}
            startIcon={<CloseIcon />}
          >
            Cancelar
          </Button>
        </Box>

        <Dialog open={openTutorial} onClose={() => setOpenTutorial(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{tutorialContent[tutorialStep].title}</DialogTitle>
          <DialogContent dividers>{tutorialContent[tutorialStep].content}</DialogContent>
          <DialogActions>
            <Button onClick={handleNextStep}>
              {tutorialStep < tutorialContent.length - 1 ? "Siguiente" : "Cerrar"}
            </Button>
          </DialogActions>
        </Dialog>

        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título de la nota"
              variant="standard"
              fullWidth
              error={!!tituloError}
              helperText={tituloError}
              InputProps={{ disableUnderline: true, sx: { fontSize: '1.8rem', fontWeight: 600 } }}
            />

            <TextField
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              multiline
              fullWidth
              placeholder="Escribe algo..."
              variant="standard"
              error={!!contenidoError}
              helperText={contenidoError}
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: '1rem', minHeight: '200px' }
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{ alignSelf: 'center', px: 4, py: 1.5, fontWeight: 'bold', backgroundColor: '#234e68' }}
            >
              {submitting ? <CircularProgress size={24} /> : 'Guardar Nota'}
            </Button>
          </CardContent>
        </Card>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbarSeverity} onClose={handleSnackbarClose} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
