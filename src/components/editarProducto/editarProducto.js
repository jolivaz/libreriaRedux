import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obteniendoProductoEditadoAction, editarProductoAction } from '../../actions/productosActions'
import { 
    validarForumularioActions, 
    validacionExito,
    validacionError
} from '../../actions/validarFormularioActions';

const EditarProducto = ({ match }) => {

    const nombreRef = useRef('');
    const precioRef = useRef(0);

    const dispatch = useDispatch();

    //dispatch acciones
    const editarProducto = (producto) => dispatch(editarProductoAction(producto));
    const validarFormulario = () => dispatch(validarForumularioActions());
    const validarFormularioExito = () => dispatch(validacionExito());
    const validarFormularioError = () => dispatch(validacionError());

    //Obtener el id de react router
    const { id } = match.params;

    // Obtener el estado
    const producto = useSelector(state => state.productos.producto );
    const error = useSelector(state => state.productos.error );
    const errorGeneral = useSelector( state => state.error.error);
    

    // cuando el componente cargue llamamos al editar
    useEffect( () => {
        dispatch(obteniendoProductoEditadoAction(id))
    }, [dispatch, id])

    const handleSubmit = (e) => {

        e.preventDefault();

        // validar el formulario
        validarFormulario();

        if(nombreRef.current.value.trim() === '' || nombreRef.current.value.trim() === ''){
            validarFormularioError()
            return
        }

        //No hubo error en validacion
        validarFormularioExito();

        editarProducto({
            id,
            nombre: nombreRef.current.value,
            precio: precioRef.current.value
        });

    }

    if(!producto){
        return 'cargando..'
    }

    let mensajeError = '';
    if (error) {
        mensajeError = 'Hubo un error. Intente nuevamente'
    } else if (errorGeneral) {
        mensajeError = 'Todos los campos son requeridos'
    }
   

    return(
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center">Editar Producto</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Titulo</label>
                                <input 
                                    ref={nombreRef}
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Titulo"
                                    defaultValue={producto.nombre}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio del Producto</label>
                                <input 
                                    ref={precioRef}
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Precio"
                                    defaultValue={producto.precio}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar Cambios</button>
                        </form>
                        {
                            error || errorGeneral ?
                            <p className="font-weight-bold alert alert-danger mt-4 text-center">
                                {mensajeError}
                            </p>
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarProducto;