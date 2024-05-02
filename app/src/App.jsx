import './App.css'
import { Route, Routes } from 'react-router-dom'
import { CadastroEntregador } from './Entregador/CadastroEntregador'
import { EdicaoEntregador } from './Entregador/EdicaoEntregador'
import { ExclusaoEntregador } from './Entregador/ExclusaoEntregador'
import { ListarEntregador } from './Entregador/ListarEntregador'
import { SelecionaEntregador } from './Entregador/SelecionaEntregador'
import { ResponsiveAppBar } from './components/ResponsiveBar'
import * as React from 'react';




function App() {
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
            <Route path='/cadastroEntregador' element={<CadastroEntregador />} />
            <Route path='/edicaoEntregador' element={<EdicaoEntregador/>} />
            <Route path='/exclusaoEntregador' element={<ExclusaoEntregador/>} />
            <Route path='/listarEntregador' element={<ListarEntregador/>} />
            <Route path='/selecionaEntregador' element={<SelecionaEntregador/>} />
      </Routes>
    </>
  )
}
export default App
