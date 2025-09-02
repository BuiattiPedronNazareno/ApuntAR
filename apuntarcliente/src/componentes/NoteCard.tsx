import { Card, CardContent, Chip, Typography, Box, alpha} from "@mui/material";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

interface NoteCardProps {
    id: number;
    titulo: string;
    prioridad: string;
    materiaNombre: string;
}

export default function NoteCard({ titulo, id, prioridad, materiaNombre }: NoteCardProps) {
    
    const theme = useTheme();

    return (
        <Link href={`/notas/${id}`} passHref style={{ textDecoration: 'none' }}>
            <Card 
                sx={{
                    width: 220,
                    height: 220,
                    transition: 'transform 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    borderRadius: 3, 
                    backgroundColor: alpha(theme.palette.background.paper, 0.7),
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: theme.shadows[8],
                    }
                }}
            >
                <CardContent sx={{ textAlign: 'center' }}>

                    <Box sx={{ position: "absolute", top: 8, left: 8 }}>
                        <Chip
                            label={materiaNombre}
                            size="small"
                            sx={{
                                fontWeight: "bold",
                                backgroundColor: alpha(theme.palette.background.paper, 0),
                            }}
                        />
                    </Box>

                    <Box sx={{ textAlign: "center", mt: 4 }}>
                        <Typography variant="h6" component="div" gutterBottom>
                            {titulo}
                        </Typography>
                        <Chip
                            label={prioridad}
                            sx={{
                                fontWeight: 'bold',
                                borderRadius: 10,
                                padding: '1px 7px',
                                color: "white",
                                backgroundColor:
                                    prioridad === 'ALTA'
                                    ? '#4b2c5e' 
                                    : prioridad === 'MEDIA'
                                    ? '#1f4d3a' 
                                    : '#6a1f2a', 
                            }}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Link>
    );
}