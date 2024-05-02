import { Fragment, useState } from "react"
import { Button, Grid, IconButton, Snackbar } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";


const SearchBar = ({setSearchQuery}) => (
    <form style={{ display: 'flex', alignItems: 'center', position:'fixed',right:'30vw',top:60}}>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label="Digite o nome do entregador"
        variant="outlined"
        placeholder="Search..."
        size="small"
        sx={{top:10,right:10,width:'500px'}}
      />
      <IconButton type="submit" aria-label="search" sx={{marginTop:3}}>
        <SearchIcon style={{ fill: "black" }} />
      </IconButton>
    </form>
  );

const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.toLowerCase().includes(query.toLowerCase()));
    }
  };

// Mudar data depois pra pegar todos os entregadores
const data = [
    "Paris",
    "London",
    "New York",
    "Tokyo",
    "Berlin",
    "Buenos Aires",
    "Cairo",
    "Canberra",
    "Rio de Janeiro",
    "Dublin"
  ];
export function EdicaoEntregador() {
    const [searchQuery, setSearchQuery] = useState("");
    const dataFiltered = filterData(searchQuery, data);
  
    return (
      <div
        style={{
          display: "flex",
          alignSelf: "left",
          justifyContent: "left",
          flexDirection: "column",
          padding: 20
        }}
      >
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div style={{ padding: 3, textAlign:"left",position:'fixed',top:130,right:'50vw'}}>
          {dataFiltered.map((d) => (
            <div
              className="text"
              style={{
                alignSelf: "left",
                padding: 5,
                justifyContent: "left",
                fontSize: 15,
                color: "black",
                margin: 1,
                width: "250px",
                BorderColor: "green",
                borderWidth: "10px",
                font:'monospace',
              }}
              key={d.id}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    );

}