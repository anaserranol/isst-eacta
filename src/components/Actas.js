import React from "react";

import Header from "./Header";
import Footer from "./Footer";

import acta from "../assets/img/acta.svg";

import "../assets/style/Actas.css"

import { useLocation } from 'react-router-dom';

export default function Actas (props) {

    const location = useLocation();
    const state = location.state;
    const userLogged = props.userLogged;
        return (
            <div className="todo">
            <Header userLogged = {userLogged} rol = {userLogged.rol} onLogout={() => props.onLogout()}/>
            <div className="actaSpace">
                <img className="actaPDF" src={acta}/>
                <div>
                <h1>Actas de {state.usuario}</h1>
                    <button hidden={userLogged.rol !== "profesor"} disabled={state.estado === "final"}>Crear</button>
                    <button hidden={userLogged.rol !== "profesor"} disabled={state.estado === "final"}>Firmar</button>
                    <button>Descargar</button>
                    <p>Las actas están {state.estado === "final" ? "firmadas" : "sin firmar"}</p>
                </div>
            </div>
            <Footer />
            </div>
        )
    
}