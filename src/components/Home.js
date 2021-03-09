import React from "react";
import { userLogout } from "../redux/actions";

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <h1 id="prueba"> Holi {this.props.userLogged.rol} </h1>
                <button onClick={ () => this.props.onLogout()}> Cerrar sesión </button>
            </div>
        )
    }
}