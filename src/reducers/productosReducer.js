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

const initialState = {
    productos: [],
    producto: {},
    error: null,
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                error: null
            }
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                error: null,
                productos: [...state.productos, action.payload]
            }
        case AGREGAR_PRODUCTO_ERROR:
            return {
                ...state,
                error: true,
            }
        case COMENZAR_DESCARGA_PRODUCTOS:
            return {
                ...state,
                loading: true,
            }
        case DESCARGA_PRODUCTOS_EXITOSA:
            return {
                ...state,
                productos: action.payload,
                loading: false,
                producto: {}
            }
        case DESCARGA_PRODUCTOS_ERROR:
            return {
                ...state,
                productos: [],
                error: true,
                loading: false,
                producto: {}
            }    
        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                error: null
            }
        case ELIMINAR_PRODUCTO_EXITOSA:
            return {
                ...state,
                productos: state.productos.filter((producto) => producto.id !== action.payload),
                error: null
            }  
        case ELIMINAR_PRODUCTO_ERROR:
            return {
                ...state,
                error: true
            }            
        case OBTENER_PRODUCTO_EDITAR:
            return {
                ...state,
                error: null
            }      
        case EDITAR_PRODUCTO_EXITOSA:
            return {
                ...state,
                error: null,
                producto: action.payload
            }      
        case EDITAR_PRODUCTO_ERROR:
            return {
                ...state,
                error: true
            }   
        case COMENZAR_EDITAR_PRODUCTO:
            return {
                ...state,
                error: null
            }      
        case PRODUCTO_EDITADO_EXITO:
            return {
                ...state,
                error: null,
                productos: state.productos.map(
                    producto => producto.id === action.payload.id ?
                    producto = action.payload : producto
                  //mapeamos los productos y modificamo el id del que estamos pasando
                )
            }      
        case PRODUCTO_EDITADO_ERROR:
            return {
                ...state,
                error: true
            }  
        default:
            return state
    }
}