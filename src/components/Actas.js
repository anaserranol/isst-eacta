import React from "react";

import Header from "./Header";
import Footer from "./Footer";

import acta from "../assets/img/acta.svg";

import "../assets/style/Actas.css"

export default class Actas extends React.Component {
    render() {
        return (
            <div className="todo">
            <Header userLogged = {this.props.userLogged} rol = {this.props.userLogged.rol} onLogout={() => this.props.onLogout()}/>
            <div className="actaSpace">
                <img className="actaPDF" src={acta}/>
                <h1>Actas de </h1>
            </div>
            <Footer />
            </div>
        )
    }
}