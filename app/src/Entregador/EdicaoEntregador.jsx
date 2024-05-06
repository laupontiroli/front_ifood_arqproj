import React, { useState, useEffect, Fragment } from "react";
import { Button, IconButton, Snackbar } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';

const SearchBar = ({ setSearchQuery, setShowResult }) => (
  <form style={{ display: 'flex', alignItems: 'center', position: 'fixed', right: '30vw', top: 60 }}>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
        setShowResult(e.target.value.length > 0);
      }}
      label="Digite o nome do entregador"
      variant="outlined"
      placeholder="Search..."
      size="small"
      sx={{ top: 10, right: 10, width: '500px' }}
    />
    <IconButton type="submit" aria-label="search" sx={{ marginTop: 3 }}>
      <SearchIcon style={{ fill: "black" }} />
    </IconButton>
  </form>
);

export function EdicaoEntregador() {
  const [dataList, setDataList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [veiculo, setVeiculo] = useState("");
  const [preco, setPreco] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("")
  const [status, setStatus] = useState("")



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/entregador', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Erro ao obter dados do servidor');
      }
      const data = await response.json();
      const cpfList = data.map(item => item.cpf);
      setDataList(cpfList);
    } catch (error) {
      console.error('Erro ao obter dados do servidor:', error);
    }
  };

  const filteredCpfList = dataList.filter(cpf => cpf.includes(searchQuery));

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

  const clickAtualizar = () => {
    const data = {
      'status': status,
      'tipoVeiculo': veiculo,
      'precoViagem': preco,
    };

    fetch('http://localhost:8080/entregador/'+ toString(cpf), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      setOpen(true);
      setMessage("Dados do entregador atualizados");
    }).catch(error => {
      setOpen(true);
      setMessage(response.json().message);
    });
  };

  const getEntregador = async () => {
    try {
      const response = await fetch('http://localhost:8080/entregador/' + cpf, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(await response.json());
      }
      const responseObject = await response.json();
      setNome(responseObject.nome);
      setStatus(responseObject.status);
      setPreco(responseObject.precoViagem);
      setVeiculo(responseObject.tipoVeiculo);
      setOpen(true);
      setMessage("Dados do entregador atualizados");
    } catch (error) {
      setOpen(true);
      setMessage(responseObject.message);
    }
  };
  

  return (
    <div style={{ display: "flex", alignSelf: "left", justifyContent: "left", flexDirection: "column", padding: 20 }}>
      <SearchBar setSearchQuery={setSearchQuery} setShowResult={setShowResult} />
      {showResult && (
        <div style={{
          textAlign: "left",
          position: 'fixed',
          top: 120,
          right: '33vw',
          padding: '10px',
          marginTop: '10px',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: '4px',
          width: '490px'
        }}>
          {filteredCpfList.map((cpf, index) => (
            <Button
              className="text"
              style={{
                alignSelf: "left",
                padding: 5,
                justifyContent: "left",
                fontSize: 13,
                margin: 1,
                width: "250px",
                font: 'monospace',
                backgroundColor: 'white',
              }}
              key={index}
              onClick={() => {
                setCpf(cpf);
                getEntregador();
              }}
            >
              {cpf}
            </Button>
          ))}
        </div>
      )}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <h2>Edite os dados do entregador:</h2>
        </div>
        <div>
          <TextField
            id="outlined-read-only-input"
            value={nome}
            label="Nome"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            id="outlined-read-only-input"
            value={cpf}
            label="CPF"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            value={veiculo} onChange={e => setVeiculo(e.target.value)}
            label="Tipo de veículo"
          />
          <TextField
            value={preco} onChange={e => setPreco(e.target.value)}
            label="Preço da viagem"
          />
          <TextField
          id="outlined-read-only-input"
          label="Status"
          value={status}
          InputProps={{
            readOnly: true,
          }}
        />
        </div>
        <Button id='atualizar' variant="outlined" onClick={clickAtualizar}>Atualizar</Button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          action={action}
        ></Snackbar>
      </Box>
    </div>
  );
}
