import React, { useState } from 'react';
import Mensaje from '../mensaje/mensaje';
import { useDispatch, useSelector } from 'react-redux';
import { crearNuevoProductoAction } from '../../actions/productosActions';
import { validarForumularioActions, 
         validacionExito,
         validacionError } from '../../actions/validarFormularioActions';

const NuevoProducto = () => {

    //state del componente
    const [nombre, guardarNombre] = useState('');
    const [categoria, guardarCategoria] = useState('');
    const [precio, guardarPrecio] = useState(0);
    const [mensaje, guardarMensaje] = useState('');

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

        // Validar y agregar producto
        validarFormularioExito();
        agregarNuevoProduto({
            nombre,
            precio,
            categoria
        })

        //Limpiar formulario
        guardarNombre('')
        guardarPrecio(0)
        guardarCategoria('')

        //Mostrar mensaje de agregado
        guardarMensaje('¡Libro agregado con exito!')

        //Ocultar mensaje de agregado
        setTimeout(()=> {
            guardarMensaje('')
        }, 3000)
    }

    return (
        <div className="row justify-content-center mt-5">
            {
                mensaje !== '' ?
                <Mensaje mensaje={mensaje} />
                : null
            }
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
                                <label>Categoria</label>
                                <select 
                                    className="categorias"
                                    onChange={e => guardarCategoria(e.target.value)}>
                                    <option value="cocina">Cocina</option>
                                    <option value="comedia">Comedia</option>
                                    <option value="ciencia">Ciencia</option>
                                    <option value="deporte">Deporte</option>
                                </select>
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