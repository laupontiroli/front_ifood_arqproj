import React, { useState, useEffect, Fragment } from "react";
import { Button, IconButton, Snackbar, Table } from '@mui/material';
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
        sx={{ top: 50, right: 10, width: '500px' }}
      />
      <IconButton type="submit" aria-label="search" sx={{ marginTop: 13 }}>
        <SearchIcon style={{ fill: "black" }} />
      </IconButton>
    </form>
  );


export function SelecionaEntregador() {
    const [dataList, setDataList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const [cpf, setCpf] = useState("");
    const [nome, setNome] = useState("")
    const [status, setStatus] = useState("")
    const [colorStatus, setColorStatus] = useState('#AFE1AF')

  
  
  
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

    const getEntregador = async (cpf_) => {
    try {
      const response = await fetch('http://localhost:8080/entregador/' + cpf_, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(await response.json());
      }
      const responseObject = await response.json();
      setNome(responseObject.nome);
      setStatus(responseObject.status);
      if (status == 'INDISPONIVEL') {
        setColorStatus('lightred');
      }
      setCpf(cpf_);
      setShowOrders(true);
      setOpen(true);
      setMessage("Entregador encontrado");
    } catch (error) {
      setOpen(true);
      setMessage(responseObject);
    }
    };
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
    
  
    const filteredCpfList = dataList.filter(cpf => cpf.includes(searchQuery));
    return (
        <>
            <h2 style={{
            position: 'fixed',
            top: 80,
            right: '36vw',
            padding: '10px',
            marginTop: '10px',
            color: 'black',

            }}>
            Veja os pedidos feitos pelo entregador
            </h2>       
        <SearchBar setSearchQuery={setSearchQuery} setShowResult={setShowResult} />
        {showResult && (
            <div style={{
            textAlign: "left",
            position: 'fixed',
            top: 200,
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
                    getEntregador(cpf);
                }}
                >
                {cpf}
                </Button>
            ))}
            </div>
        )} 
        {showOrders && (
        <div style={{ backgroundColor: colorStatus, padding: '10px', borderRadius:'30px'}}>
            <table>
            <tr>
                <th>Nome: </th>
                <td>{nome}</td>
                <td></td>
                <th>Cpf: </th>
                <td>{cpf}</td>
                <td></td>
                <th>Status: </th>
                <td>{status}</td>
            </tr>
            </table>
        </div>
        )}
        </>
    )
}