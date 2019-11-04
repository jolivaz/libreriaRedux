import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EditarProducto from './components/editarProducto/editarProducto';
import NuevoProducto from './components/nuevoProducto/nuevoProducto';
import Productos from './components/productos/productos';
import Header from './components/header/header';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="container">
          <Header title="Libreria NJ"></Header>
          <Switch>
            <Route exact path="/" component={Productos} />
            <Route exact path="/producto/nuevo" component={NuevoProducto} />
            <Route exact path="/editar/producto/:id" component={EditarProducto} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
