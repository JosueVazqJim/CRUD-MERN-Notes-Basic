import React from "react";
import ReactDOM from "react-dom/client";
import { App } from './components/App'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true; //cada peticion al server requerira de credenciales, estar logueado
/*/*se pone este tercera opcion porque el server esta en
        diferente dominio y en este punto se le indico al cors del server que no aceptara cualquiera  */

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.Fragment>
    <App></App>
  </React.Fragment>
)
