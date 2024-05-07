import React, { useState, useEffect } from "react";
import { Button, Grid, IconButton, Snackbar } from '@mui/material';

export function ListarEntregador() {
    const [entregadores, setEntregadores] = useState([]);


    return (
        <>
           <h1>Listar Entregador</h1>
           <ul>
               {entregadores.map(entregador => (
                   <li key={entregador.id}>{entregador.nome}</li>
               ))}
           </ul>
        </>
    );
}
