import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'http://localhost:4300'
});

export default clienteAxios;