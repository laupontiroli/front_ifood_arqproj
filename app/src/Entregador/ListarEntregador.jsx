import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export function ListarEntregador() {
    const [entregadores, setEntregadores] = useState([]);

    useEffect(() => {
        // Simulação de uma requisição para buscar os dados dos entregadores
        fetch('http://localhost:8080/entregador')
            .then(response => response.json())
            .then(data => setEntregadores(data))
            .catch(error => console.error('Erro ao buscar entregadores:', error));
    }, []);

    return (
        <>
           <h2>Listar Entregador</h2>
           <TableContainer component={Paper}>
               <Table>
                   <TableHead>
                       <TableRow>
                           <TableCell>Nome</TableCell>
                           <TableCell>CPF</TableCell>
                           <TableCell>Tipo de Veículo</TableCell>
                           <TableCell>Preço da Viagem</TableCell>
                           <TableCell>Status</TableCell>
                       </TableRow>
                   </TableHead>
                   <TableBody>
                       {entregadores.map(entregador => (
                           <TableRow key={entregador.id}>
                               <TableCell>{entregador.nome}</TableCell>
                               <TableCell>{entregador.cpf}</TableCell>
                               <TableCell>{entregador.tipoVeiculo}</TableCell>
                               <TableCell>{entregador.precoViagem}</TableCell>
                               <TableCell>{entregador.status}</TableCell>
                           </TableRow>
                       ))}
                   </TableBody>
               </Table>
           </TableContainer>
        </>
    );
}
