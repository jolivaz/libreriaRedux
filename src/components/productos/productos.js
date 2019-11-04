import React, {Fragment, useEffect } from 'react';
import Producto from '../producto/producto';
import Filtros from '../filtros/filtros';
import { obtenerProductosActions } from '../../actions/productosActions';
import { useDispatch, useSelector } from 'react-redux';

const Productos = () => {

    const dispatch = useDispatch();

    useEffect( ()=> {
        dispatch(obtenerProductosActions());
    },[dispatch])

    // traer data del state redux
    const loading = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const productos = useSelector(state => state.productos.productos);

    return (
        <Fragment>
            {
                error ?
                <p className="font-weight-bold alert alert-danger mt-4 text-center">
                    Hubo un error
                </p>
                : null
            }
                <Fragment>
                    <h2 className="text-center my-5">Listado de Productos</h2>
                    <Filtros />
                    <table className="table table-striped">
                        <thead className="bg-primary table-dark">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Acciones</th>
                            </tr>   
                        </thead>
                        <tbody>
                            {
                               productos.map(producto => (
                                        <Producto
                                            key={producto.id}
                                            producto={producto}
                                        />
                                    )) 
                            }

                        </tbody>
                    </table>
                    {
                        loading ? 
                        <p>Cargando...</p>
                        : null
                    }
                </Fragment>
        </Fragment>
    )
}

export default Productos;