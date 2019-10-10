import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({title}) => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
            <h1>
                <Link to={'/'} className="text-light">
                    {title}
                </Link>
            </h1>
            <Link 
                to={'/producto/nuevo'} 
                className="btn btn-danger nuevo-post d-block d-md-inline-block">
                Agregar Producto
            </Link>
        </nav>
    )
}

export default Header;