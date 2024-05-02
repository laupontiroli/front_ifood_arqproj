import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

import { Link, Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export function ResponsiveAppBar() {
  const pages = ['Cadastrar', 'Listar', 'Editar', 'Excluir', 'Ver Pedidos'];
  const linksDict = {
    'Cadastrar': '/cadastroEntregador',
    'Editar': '/edicaoEntregador',
    'Excluir': '/exclusaoEntregador',
    'Listar': '/listarEntregador',
    'Ver Pedidos': '/selecionaEntregador',
  };

    return (
      <AppBar position="static">
        <Container sx={{ position: 'fixed', width: '100%', background: 'white', top: 0, left: 0, color: 'black' }}>
          <Toolbar disableGutters>
            <DeliveryDiningIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Link to='/'>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'black',
                textDecoration: 'none',
              }}
            >
              IFood
            </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link to={linksDict[page]}>
                <Button
                  key={page}
                  sx={{ my: 2, color: 'white', display: 'block', color: 'black' }}
                >
                  {page}
                </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
}
