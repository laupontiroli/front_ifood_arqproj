import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function ListarEntregadores() {
  const [entregadores, setEntregadores] = useState([]);

  useEffect(() => {
    const fetchEntregadores = async () => {
      try {
        const response = await fetch('http://localhost:8080/entregador');
        const data = await response.json();
        setEntregadores(data);
      } catch (error) {
        console.error('Erro ao buscar dados do backend:', error);
      }
    };

    fetchEntregadores();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell align="right">CPF</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Veículo</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entregadores.map((entregador) => (
            <StyledTableRow key={entregador.id}>
              <StyledTableCell component="th" scope="row">
                {entregador.nome}
              </StyledTableCell>
              <StyledTableCell align="right">{entregador.cpf}</StyledTableCell>
              <StyledTableCell align="right">{entregador.status}</StyledTableCell>
              <StyledTableCell align="right">{entregador.tipoVeiculo}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListarEntregadores;
