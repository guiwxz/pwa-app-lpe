import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'

import Menu from './components/Menu'
import Home from './components/Home'

import Products from './containers/products/products';
import Sales from './containers/sales/sales';
import Container from './components/Container';

function App() {
  return (
    <Router>
      <Menu/>
      <Container>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/produtos" element={<Products/>}/>
          <Route path="/vendas" element={<Sales/>}/>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
