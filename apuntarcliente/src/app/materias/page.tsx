'use client';

import { useEffect, useState } from "react";
import { Container, IconButton, Button, MenuItem, Select, InputLabel, FormControl, Box, Card, CardContent, Typography, CircularProgress, Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from "@mui/material";
import { getMaterias, Materia, deleteMateria } from "@/lib/materia";
import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function MateriasPage() {
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState("nombreAsc");
    const [isSelecting, setIsSelecting] = useState(false);
    const [selectedMaterias, setSelectedMaterias] = useState<number[]>([]);
    const [openDialog, setOpenDialog] = useState(false);

    const sortMaterias = (materias: Materia[], option: string) => {
    return [...materias].sort((a, b) => {
        switch (option) {
        case "nombreAsc":
            return a.nombre.localeCompare(b.nombre);
        case "nombreDesc":
            return b.nombre.localeCompare(a.nombre);
        case "nivelAsc":
            return a.nivel.localeCompare(b.nivel);
        case "nivelDesc":
            return b.nivel.localeCompare(a.nivel);
        case "nivelAcademicoAsc":
            return a.nivelAcademico.localeCompare(b.nivelAcademico);
        case "nivelAcademicoDesc":
            return b.nivelAcademico.localeCompare(a.nivelAcademico);
        default:
            return 0;
        }
    });
    };


    useEffect(() => {
        const fetchMaterias = async () => {
        try {
            const data = await getMaterias();
            setMaterias(data);
        } catch (error) {
            console.error("Error fetching materias:", error);
        } finally {
            setLoading(false);
        }
        };
        fetchMaterias();
    }, []);

    const toggleSelect = (id: number) => {
        setSelectedMaterias(prev =>
        prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    const handleStartSelecting = () => {
        setIsSelecting(true);
        setSelectedMaterias([]);
    };

    const handleCancel = () => {
        setIsSelecting(false);
        setSelectedMaterias([]);
    };

    const handleConfirmDelete = async () => {
        try {
        for (const id of selectedMaterias) {
            await deleteMateria(id);
        }
        setMaterias(prev => prev.filter(m => !selectedMaterias.includes(m.id)));
        setIsSelecting(false);
        setSelectedMaterias([]);
        } catch (error) {
        console.error("Error eliminando materias:", error);
        alert("No se pudo eliminar la(s) materia(s).");
        } finally {
        setOpenDialog(false);
        }
    };

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
                Mis Materias
            </Typography>
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
                + Nueva Materia
            </Button>
        </Box>

        <FormControl sx={{ minWidth: 180, mb: 4, mt: 4 }}>
        <InputLabel>Ordenar por</InputLabel>
        <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            label="Ordenar por"
        >
            <MenuItem value="nombreAsc">Nombre (A-Z)</MenuItem>
            <MenuItem value="nombreDesc">Nombre (Z-A)</MenuItem>
            <MenuItem value="nivelAsc">Nivel (A-Z)</MenuItem>
            <MenuItem value="nivelDesc">Nivel (Z-A)</MenuItem>
            <MenuItem value="nivelAcademicoAsc">Nivel académico (A-Z)</MenuItem>
            <MenuItem value="nivelAcademicoDesc">Nivel académico (Z-A)</MenuItem>
        </Select>
        </FormControl>

        {materias.length > 0 ? (
            <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 3,
            }}>
                {sortMaterias(materias, sortOption).map((materia) =>  (
                    <Box 
                        key={materia.id} 
                        sx={{ 
                            position: "relative",
                            display: "flex", 
                            justifyContent: "center"  
                        }}
                    >
                        <Card
                            component={Link}
                            href={`/materias/${materia.id}`}
                            sx={{
                                textDecoration: "none",
                                cursor: "pointer",
                                boxShadow: 2,
                                "&:hover": { boxShadow: 6 },
                                width: "100%",
                            }}
                        >
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold">
                                {materia.nombre}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Nivel: {materia.nivel}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Académico: {materia.nivelAcademico}
                            </Typography>
                            </CardContent>
                        </Card>

                        {isSelecting && (
                            <IconButton
                                onClick={() => toggleSelect(materia.id)}
                                sx={{
                                position: "absolute",
                                bottom: 8,
                                right: 8,
                                borderRadius: "50%",
                                boxShadow: 4,
                                border: "2px solid #252525ff",
                                }}
                            >
                                {selectedMaterias.includes(materia.id) ? (
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
                No tienes materias creadas aún
            </Typography>
            <Button
                variant="outlined"
                color="primary"
                component={Link}
                href="/materias/crear"
                sx={{ mt: 2 }}
            >
                Crear tu primera materia
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
                    href="/"
                    sx={{ boxShadow: 3, mb: 0.5 }}
                    >
                        <HomeIcon />
                    </Fab>
                    <Typography variant="caption" sx={{ display: "block", textAlign: "center" }}>
                        Home
                    </Typography>
                </Box>

                <Fab 
                    onClick={handleStartSelecting}
                    sx={{
                        boxShadow: 3
                    }}
                >
                    <DeleteIcon />
                </Fab>
            </Box>
        )}

        {isSelecting && (
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => setOpenDialog(true)}
                    disabled={selectedMaterias.length === 0}
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
                        if (confirm("⚠️ Esto eliminará TODAS tus materias y sus notas asociadas. ¿Desea continuar?")) {
                        try {
                            for (const materia of materias) {
                            await deleteMateria(materia.id);
                            }
                            setMaterias([]);
                            setIsSelecting(false);
                            setSelectedMaterias([]);
                        } catch (error) {
                            console.error("Error eliminando todas las materias:", error);
                            alert("No se pudieron eliminar todas las materias.");
                        }
                        }
                    }}
                    >
                    Eliminar todas
                </Button>
            </Box>
        )}

        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
        >
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogContent>
            <DialogContentText>
                ⚠️ Al eliminar esta(s) materia(s), también se eliminarán todas las notas relacionadas.  
                ¿Desea continuar?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
                Cancelar
            </Button>
            <Button onClick={handleConfirmDelete} color="error" variant="contained">
                Eliminar
            </Button>
            </DialogActions>
        </Dialog>

        
        </Container>
    );
}
