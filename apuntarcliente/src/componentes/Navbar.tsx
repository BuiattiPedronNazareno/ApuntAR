'use client';

import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function Navbar(){
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Link href="/" passHref>
                    <Typography variant="h6" sx={{ cursor: 'pointer'}}>
                        ApuntAR
                    </Typography>
                </Link>
                
            </Toolbar>
        </AppBar>
    );

}