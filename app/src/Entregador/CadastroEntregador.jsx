import { Fragment, useState } from "react"
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, IconButton, Snackbar } from '@mui/material';



export function CadastroEntregador() {

    const [nome, setNome] = useState()
    const [cpf, setCpf] = useState()
    const [veiculo, setVeiculo] = useState()
    const [preco, setPreco] = useState()

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const action = (
        <Fragment>
          <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
          </IconButton>
        </Fragment>
      );

    function click() {
        let data = {
          'nome': nome,
          'cpf': cpf,
          'tipoVeiculo': veiculo,
          'precoViagem': preco,
          'status': 'DISPONIVEL'
        }
    
        fetch('http://localhost:8080/entregador', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
            if (!response.ok) {
                // error processing
                throw 'Error';
            }
          setOpen(true)
          setMessage("Entergador cadastrado com sucesso")
          //load()
        }).catch(response => {
            setOpen(true)
            setMessage('Erro no cadastro do entregador!')
        })
    }

  return (
    
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <div>
            <h1>Cadastre o entregador:</h1>
        </div>
      <div>
        <TextField
          value={nome} onChange={e => setNome(e.target.value)}
          required
          id="outlined-required"
          label="Nome"
        />
        <TextField
          value={cpf} onChange={e => setCpf(e.target.value)}
          required
          id="outlined-required"
          label="CPF"
        />
       <TextField
          value={veiculo} onChange={e => setVeiculo(e.target.value)}
          required
          id="outlined-required"
          label="Tipo de veículo"
        />
         <TextField
          value={preco} onChange={e => setPreco(e.target.value)}
          required
          id="outlined-required"
          label="Preço da viagem"
        />
        <TextField
          id="outlined-read-only-input"
          label="Status"
          defaultValue="Disponível"
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <Button variant="outlined" onClick={() => click()}>Cadastrar</Button>
      <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            action={action}
        ></Snackbar>
    </Box>
  );
}