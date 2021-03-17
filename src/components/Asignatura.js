import React from "react";
import { userLogout } from "../redux/actions";
import { calificaciones, estado, fechas } from "./Constants";
import { Link } from "react-router-dom";
import Users from "./Users";
import "../assets/style/Asignatura.css"

export default class Asignaturas extends React.Component {
    render() {
        const userLogged = this.props.userLogged;
        const alumno = userLogged.name === "alumno1" ? 0 : 1;
        if (userLogged.rol === "admin"){
            return (
                <h1>Algo ha ocurrido, error</h1>
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
            <h2 id="numNota" hidden={userLogged.rol !== "alumno"}>{calificaciones[alumno][num]}</h2>
            <Link to ={{ 
                pathname: "/notas", 
                state: {
                  usuario: userLogged.subjects[num],
                  calificaciones: calificaciones,
                  numero: num,
                  estado: estado[num],
                  fechaPublic: fechas[0][num],
                  fechaRevisi: fechas[1][num]
                }
                }}
                hidden={userLogged.rol === "alumno"}><button>Calificaciones</button></Link>
            <p hidden={userLogged.rol !== "alumno"}>Nota {estado[num]}</p>
            <p hidden={userLogged.rol === "alumno"}> Las notas son {estado[num]}es</p>
            <p hidden={estado[num] === "final"}> La fecha provisional de publicacion de notas es: {fechas[0][num]}</p>
            <p hidden={estado[num] === "final"}>La fecha de revisión es: {fechas[1][num]}</p>
            <button hidden={userLogged.rol !== "alumno" || estado[num] === "final"}>Pedir revisión</button>
            <Link to ={{ 
                pathname: "/actas", 
                state: {
                  usuario: userLogged.subjects[num],
                  estado: estado[num],
                }
                }} 
            hidden={userLogged.rol !== "profesor" && userLogged.rol !== "pas"}><button>Ver actas</button></Link>
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