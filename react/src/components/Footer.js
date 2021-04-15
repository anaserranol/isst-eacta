import React from "react";

import "../assets/style/HeaderFooter.css";
import {useHistory, useLocation} from 'react-router-dom';



export default function Footer () {
    const history = useHistory();
    const location = useLocation();
    console.log(location);
        return (
            <div className="footer">
                <button className="atras" hidden={location.pathname === "/"} onClick={ () => {
                    history.push('/')
                }}>Atrás</button>
                <h2 id="gracias"> Gracias por usar eActa </h2>

            </div>
        )
    
}
