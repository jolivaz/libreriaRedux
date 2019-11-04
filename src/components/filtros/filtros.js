import React, {Fragment, useState } from 'react';
import { inciandoFiltrandoProductos } from '../../actions/productosActions';
import { useDispatch } from 'react-redux';
import './filtros.css';

const Filtros = () => {
    const opciones = ['comedia','ciencia','cocina', 'deporte']
    const [filtroComedia, guardarFiltroComedia] = useState(true)
    const [filtroCocina, guardarFiltroCocina] = useState(true)
    const [filtroCiencia, guardarFiltroCiencia] = useState(true)
    const [filtroDeporte, guardarFiltroDeporte] = useState(true)
    const [listaFiltros, guardarlistaFiltros] = useState(opciones)

    const dispatch = useDispatch()
    const filtrarProductos = (filtros) => dispatch(inciandoFiltrandoProductos(filtros));


    const handleChangeFilter = (filtro) => {
        let nuevoFiltro;
        switch (filtro) {
            case 'comedia' :
                if (filtroComedia) {
                    nuevoFiltro= listaFiltros.filter(valor => valor !== filtro)
                } else {
                    nuevoFiltro = listaFiltros
                    nuevoFiltro.push(filtro)
                }
                filtrarProductos({
                    filtro,
                    nuevoFiltro
                })
                guardarFiltroComedia(!filtroComedia)
                guardarlistaFiltros(nuevoFiltro)
                break
            case 'cocina' :
                if (filtroCocina) {
                    nuevoFiltro= listaFiltros.filter(valor => valor !== filtro)
                } else {
                    nuevoFiltro = listaFiltros
                    nuevoFiltro.push(filtro)
                }
                filtrarProductos({
                    filtro,
                    nuevoFiltro
                })
                guardarFiltroCocina(!filtroCocina)
                guardarlistaFiltros(nuevoFiltro)
                break
            case 'ciencia' :
                    if (filtroCiencia) {
                        nuevoFiltro= listaFiltros.filter(valor => valor !== filtro)
                    } else {
                        nuevoFiltro = listaFiltros
                        nuevoFiltro.push(filtro)
                    }
                    filtrarProductos({
                        filtro,
                        nuevoFiltro
                    })
                    guardarFiltroCiencia(!filtroCiencia)
                    guardarlistaFiltros(nuevoFiltro)
                    break
            case 'deporte' :
                    if (filtroDeporte   ) {
                        nuevoFiltro= listaFiltros.filter(valor => valor !== filtro)
                    } else {
                        nuevoFiltro = listaFiltros
                        nuevoFiltro.push(filtro)
                    }
                    filtrarProductos({
                        filtro,
                        nuevoFiltro
                    })
                    guardarFiltroDeporte    (!filtroDeporte )
                    guardarlistaFiltros(nuevoFiltro)
                    break
            default:
                return false
        }


    }

    return (
        <Fragment>
            <div className="filtros">
                <ul>
                    <li                     
                        id="comedia" 
                        className={filtroComedia ? 'activa-comedia' : 'desactiva-comedia'}
                        onClick={e => handleChangeFilter(e.target.id)}>Comedia
                    </li>
                    <li                     
                        id="cocina" 
                        className={filtroCocina ? 'activa-cocina' : 'desactiva-cocina'}
                        onClick={e => handleChangeFilter(e.target.id)}>Cocina
                    </li>
                    <li                     
                        id="ciencia" 
                        className={filtroCiencia ? 'activa-ciencia' : 'desactiva-ciencia'}
                        onClick={e => handleChangeFilter(e.target.id)}>Ciencia
                    </li>
                    <li                     
                        id="deporte"
                        className={filtroDeporte ? 'activa-deporte' : 'desactiva-deporte'} 
                        onClick={e => handleChangeFilter(e.target.id)}>Deporte
                    </li>
                </ul>
            </div>
        </Fragment>
    )
}

export default Filtros;
