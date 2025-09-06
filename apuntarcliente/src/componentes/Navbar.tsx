'use client';

import { AppBar, Toolbar, Typography, Avatar, Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function Navbar(){
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Link href="/" passHref style={{ textDecoration: "none", color: "inherit" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}>
                    <Avatar
                        src="/apuntar.png" 
                        alt="Logo"
                        sx={{ width: 40, height: 40 }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        ApuntAR
                    </Typography>
                </Box>
                </Link>
            </Toolbar>
        </AppBar>
    );

}