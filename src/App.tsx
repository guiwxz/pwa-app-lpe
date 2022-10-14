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
import Login from './containers/login/login';

import MenuPrivado from './components/MenuPrivado';
import MenuPublico from './components/MenuPublico';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<MenuPublico />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
          </Route>
          <Route path="/privado" element={<MenuPrivado />}>
            <Route index element={<Home/>}/>
            <Route path="produtos" element={<Products/>} />
            <Route path="vendas" element={<Sales/>} />
            <Route path="login" element={<Login />} />  
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
