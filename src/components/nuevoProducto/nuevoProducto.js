import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { crearNuevoProductoAction } from '../../actions/productosActions';
import { 
            validarForumularioActions, 
            validacionExito,
            validacionError
        } from '../../actions/validarFormularioActions';

const NuevoProducto = () => {

    //state del componente
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    // crear el dispatch por hooks

    const dispatch = useDispatch();
    const agregarNuevoProduto = (producto) => dispatch(crearNuevoProductoAction(producto));
    const validarFormulario = () => dispatch(validarForumularioActions());
    const validarFormularioExito = () => dispatch(validacionExito());
    const validarFormularioError = () => dispatch(validacionError());

    // Obtener los datos del state
    const error = useSelector((state) => state.error.error);

    const handleAddProduct = e => {
        e.preventDefault();

        validarFormulario();

        if(nombre.trim() === '' || precio.trim() === ''){
            validarFormularioError()
            return
        }

        validarFormularioExito();

        agregarNuevoProduto({
            nombre,
            precio
        })
    }

    return (
        <div className="row justify-content-center mt-5">
           <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold ">Agregar Nuevo Libro</h2>
                        <form onSubmit={handleAddProduct}>
                            <div className="form-group">
                                <label>Nombre Libro</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre Libro" 
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Libro</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Precio Libro" 
                                    value={precio}
                                    onChange={e => guardarPrecio(e.target.value)}
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Agregar</button>
                        </form>
                        {
                            error ? 
                            <p className="font-weight-bold alert alert-danger mt-4 text-center">
                                Todos los campos son obligatorios
                            </p>
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NuevoProducto;