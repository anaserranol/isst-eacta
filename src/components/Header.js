import React from "react";

import logo from "../assets/img/logo2.png";
import unknown from "../assets/img/Unknown.jpg";

import "../assets/style/HeaderFooter.css"

export default class Home extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="user">
                    <img className="fotoPerfil" src={unknown}/>
                    <div className="userInfo">
                        <p className="userName">Usuario: {this.props.userLogged.name}</p>
                        <p className="userRol">Rol: {this.props.rol} </p>
                    </div>
                </div>
                <div className="logName">
                    <img className="logLogo" src={logo} />
                    <h1>eActa</h1>
                </div>
                <button onClick={ () => this.props.onLogout()}> Cerrar sesión </button>
            </div>
        )
    }
}
