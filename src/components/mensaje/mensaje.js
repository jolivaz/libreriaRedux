import React from 'react'
import './mensaje.css'

const Mensaje = ({mensaje}) => {

    return(
        <div className="mensaje-alerta">
            <h4>{mensaje}</h4>
        </div>
    )
}

export default Mensaje;