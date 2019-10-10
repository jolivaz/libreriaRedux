import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { borrarProductoActions } from '../../actions/productosActions';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const Producto = ({producto}) => {

    //crear dispatch para redux
    const dispatch= useDispatch();

    const confirmarEliminarProducto = (id,nombre) => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: `¿Quiere eliminar este producto?`,
            text: `${nombre}`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
              swalWithBootstrapButtons.fire(
                'Producto Eliminado',
                `${nombre} ha sido eliminado`,
                'success'
              )
              dispatch(borrarProductoActions(id));
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                `Se ha cancelado la eliminacion de ${nombre}`,
                'error'
              )
            }
          })

    }

    return(
        <Fragment>
            <tr>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td className="acciones">
                    <Link 
                        to={`/editar/producto/${producto.id}`}
                        className="btn btn-primary mr-2">
                            Editar
                    </Link>
                    <button 
                        className="btn btn-danger"
                        onClick={() => confirmarEliminarProducto(producto.id, producto.nombre)}>
                        Eliminar
                    </button>
                </td>
            </tr>
        </Fragment>
    )
}

export default Producto;