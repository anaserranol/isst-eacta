import React from "react";
import { userLogout } from "../redux/actions";
import { calificaciones, estado, fechas } from "./Constants";
import { Link } from "react-router-dom";
import Users from "./Users";
import "../assets/style/Asignatura.css"

export default class Asignaturas extends React.Component {
    render() {
        const userLogged = this.props.userLogged;
        if (userLogged.rol === "admin"){
            return (
                <Users/>
            )
        }else if (userLogged.subjects === [""]){
            return (
                <div>Este usuario no tiene asignaturas</div>
            )
        }else{
        const listOfSubjects = userLogged.subjects.map((asig,num) =>
        
        <div id="box">
            <h1 id="nomAsig">{asig}</h1>
            <h2 hidden={userLogged.rol !== "alumno"}>Calificación:</h2>
            <h2 id="numNota" hidden={userLogged.rol !== "alumno"}>{calificaciones[1][num]}</h2>
            <Link to = "/notas" hidden={userLogged.rol === "alumno"}>Calificaciones</Link>
            <p hidden={userLogged.rol !== "alumno"}>Nota {estado[num]}</p>
            <p hidden={userLogged.rol === "alumno"}> Las notas son {estado[num]}es</p>
            <p hidden={estado[num] === "final"}> La fecha provisional de publicacion de notas es: {fechas[0][num]}</p>
            <p hidden={estado[num] === "final"}>La fecha de revisión es: {fechas[1][num]}</p>
            <button hidden={userLogged.rol !== "alumno" || estado[num] === "final"}>Pedir revisión</button>
            <button hidden={userLogged.rol === "alumno"}>Modificar fechas</button>
            <Link to= "/actas" hidden={userLogged.rol !== "profesor"}>Firmar actas</Link>
        </div>
        
        )

        return (
            <div>
                <div className="homeBox">
                    {listOfSubjects}
                </div>
            </div>
        )
        }
    }
}