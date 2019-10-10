import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_ERROR,
    DESCARGA_PRODUCTOS_EXITOSA,
    OBTENER_PRODUCTO_ELIMINAR,
    ELIMINAR_PRODUCTO_ERROR,
    ELIMINAR_PRODUCTO_EXITOSA,
    OBTENER_PRODUCTO_EDITAR,
    EDITAR_PRODUCTO_ERROR,
    EDITAR_PRODUCTO_EXITOSA,
    COMENZAR_EDITAR_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from "../types";
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevo producto

export function crearNuevoProductoAction(producto) {
    return (dispatch) => {
        dispatch( nuevoProducto() );

        // Insertar en la API
        clienteAxios.post('/libros', producto )
            .then(respuesta => {
                // Si se inserta correctamente
                dispatch( agregarProductoExito(producto) );
            })
            .catch(error => {
                console.error('error al agregar', error);

                // Si  hay un error
                dispatch( agregarProductoError() );
            })
    }
}

export const nuevoProducto = () => ({
    type: AGREGAR_PRODUCTO
});

export const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

export const agregarProductoError = error => ({
    type: AGREGAR_PRODUCTO_ERROR
})

// Obtener productos de la API

export function obtenerProductosActions() {
    return (dispatch) => {
        dispatch( obtenerProductosComienzo());

        clienteAxios.get('/libros' )
        .then(respuesta => {
            // Si se inserta correctamente
            dispatch( obtenerProductosExito(respuesta.data) );
        })
        .catch(error => {
            console.error('error al consultar', error);

            // Si  hay un error
            dispatch( obtenerProductosError() );
        })
    }
}

export const obtenerProductosComienzo = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS
});

export const obtenerProductosExito = productos => ({
    type: DESCARGA_PRODUCTOS_EXITOSA,
    payload: productos
})

export const obtenerProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR
})

// Borrar productos de la API

export function borrarProductoActions(id) {
    return(dispatch) => {
        dispatch(obtenerProductoEliminar());

        // Insertar en la API
        clienteAxios.delete(`/libros/${id}`)
        .then(respuesta => {

            // Si se inserta correctamente
            dispatch( productoEliminadoExito(id) );
        })
        .catch(error => {
            console.error('error al eliminar', error);

            // Si  hay un error
            dispatch( productoEliminadoError() );
        })
    }
}

export const obtenerProductoEliminar = () => ({
    type: OBTENER_PRODUCTO_ELIMINAR
})

export const productoEliminadoExito = (id) => ({
    type: ELIMINAR_PRODUCTO_EXITOSA,
    payload: id
})

export const productoEliminadoError = () => ({
    type: ELIMINAR_PRODUCTO_ERROR
})

// Obtener producto a editar

export function obteniendoProductoEditadoAction (id) {
    return(dispatch) => {
        dispatch(obtenerProductoEditar());

            // Insertar en la API
            clienteAxios.get(`/libros/${id}`)
            .then(respuesta => {
                // Si se inserta correctamente
                dispatch( editarProductoExito(respuesta.data) );
            })
            .catch(error => {
                console.error('error al eliminar', error);
    
                // Si  hay un error
                dispatch( editarProductoError() );
            })
    }
}

export const obtenerProductoEditar = () => ({
    type: OBTENER_PRODUCTO_EDITAR
})

export const editarProductoExito = (producto) => ({
    type: EDITAR_PRODUCTO_EXITOSA,
    payload: producto
})

export const editarProductoError = () => ({
    type: EDITAR_PRODUCTO_ERROR,
    error: true
})

// Editar un producto en la API desde el componente

export function editarProductoAction( producto ) {
    return (dispatch) => {
        dispatch(editandoProductoObtenido())

        // Consultar la API
        clienteAxios.put(`/libros/${producto.id}`, producto )
            .then(respuesta => {
                dispatch(editandoProductoObtenidoExito(respuesta.data) ) ;

                Swal.fire(
                    'Almacenado',
                    'El producto se actualizó correctamente',
                    'success'
                )
                
            })
            .catch( error => {
                console.error(error);
                dispatch(editandoProductoObtenidoError()) 
            })

    }
 } 

export const editandoProductoObtenido = () => ({
    type: COMENZAR_EDITAR_PRODUCTO
})

export const editandoProductoObtenidoExito = (producto) => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto       
})

export const editandoProductoObtenidoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    error: true
})
