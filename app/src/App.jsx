import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import { Grid } from '@mui/material'
import { CadastroEntregador } from './Entregador/CadastroEntregador'
import { EdicaoEntregador } from './Entregador/EdicaoEntregador'
import { ExclusaoEntregador } from './Entregador/ExclusaoEntregador'
import { ListarEntregador } from './Entregador/ListarEntregador'
import { SelecionaEntregador } from './Entregador/SelecionaEntregador'


function App() {
  return (
    <>
      <Routes>
            <Route path='/cadastro_entregador' element={<CadastroEntregador />} />
            <Route path='/edicao_entregador' element={<EdicaoEntregador/>} />
            <Route path='/exclusao_entregador' element={<ExclusaoEntregador/>} />
            <Route path='/listar_entregador' element={<ListarEntregador/>} />
            <Route path='/seleciona_entregador' element={<SelecionaEntregador/>} />
      </Routes>
    </>
  )
}
export default App
