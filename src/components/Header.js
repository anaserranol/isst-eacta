import React from "react";

import logo from "../assets/img/logo2.png";

import "../assets/style/HeaderFooter.css"

export default class Home extends React.Component {
    render() {
        return (
            <div className="header">
                <h1 id="prueba"> Holi {this.props.rol} </h1>
                <div className="logName">
                    <img className="logLogo" src={logo} />
                    <h1>eActa</h1>
                </div>
                <button onClick={ () => this.props.onLogout()}> Cerrar sesión </button>
            </div>
        )
    }
}
