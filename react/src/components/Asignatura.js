import React from "react";
import { calificaciones, estado, fechas } from "./Constants";
import { Link } from "react-router-dom";
import "../assets/style/Asignatura.css";
import axios from "axios"

export default class Asignaturas extends React.Component {
  render() {
    const { userLogged, subjects, notas } = this.props;
    const alumno = userLogged.name === "alumno1" ? 0 : 1;
    console.log(notas)
    if (userLogged.rol === "admin") {
      return <h1>Algo ha ocurrido, error</h1>;
    } else if (subjects === [""]) {
      return <div>Este usuario no tiene asignaturas</div>;
    } else {
      const listOfSubjects = subjects.map((asig, num) => (
        <div id="box" key={num}>
          <h1 id="nomAsig">{asig.acronimo}</h1>   
          <h2 hidden={userLogged.rol !== "alumno"}>Calificación:</h2>
          <h2 id="numNota" hidden={userLogged.rol !== "alumno"}>
            {userLogged.rol !== "alumno" ? null : notas[num].nota}
          </h2>
          <Link
            to={{
              pathname: "/notas",
              state: {
                //usuario: userLogged.subjects[num],
                codAsig: asig.codigo,
                calificaciones: calificaciones,
                numero: num,
                estado: asig.final,
                fechaPublic: asig.fechaPublicacion,
                fechaRevisi: asig.fechaRevision,
              },
            }}
            hidden={userLogged.rol !== "profesor"}
          >
            <button>Calificaciones</button>
          </Link>
          <p hidden={userLogged.rol !== "alumno"}>Nota {estado[num]}</p>
          <p hidden={userLogged.rol === "alumno"}>
            {" "}
            Las notas son {estado[num]}es
          </p>
          <p hidden={asig.final}>
            {" "}
            La fecha provisional de publicacion de notas es:{" "}
            {asig.fechaPublicacion.dayOfMonth + "/" + asig.fechaPublicacion.monthValue + "/" +asig.fechaPublicacion.year}
          </p>
          <p hidden={asig.final}>
            La fecha de revisión es: {asig.fechaRevision.dayOfMonth + "/" + asig.fechaRevision.monthValue + "/" +asig.fechaRevision.year}
          </p>
          <button
            hidden={userLogged.rol !== "alumno" || asig.final}
            disabled={userLogged.rol !== "alumno" ? true : notas[num].revisionPedida}
            onClick={() => this.pedirRevision(num)}
          >
            Pedir revisión
          </button>
          <p hidden={userLogged.rol !== "alumno" || asig.final}>
            {" "}
            {userLogged.rol !== "alumno" ? "null" :notas[num].revisionPedida
              ? "Ya has pedido revisión"
              : "No has pedido revisión"}
          </p>
          <Link
            to={{
              pathname: "/actas",
              state: {
                //usuario: userLogged.subjects[num],
                estado: estado[num],
              },
            }}
            hidden={userLogged.rol !== "profesor" && userLogged.rol !== "pas"}
          >
            <button>Ver actas</button>
          </Link>
        </div>
      ));

      return (
        <div>
          <div className="homeBox">{listOfSubjects}</div>
        </div>
      );
    }
  }
  pedirRevision = async (num) => {
    console.log(this.props.notas[num].id)
    this.props.notas[num].revisionPedida = true;

    console.log(this.props.notas[num]);

        try {
          await fetch("http://localhost:8080/EACTA-SERVICE/rest/Calificaciones/" + this.props.notas[num].id, {
              method: 'POST', 
              headers:{
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(this.props.notas[num])
          }).then(response => response.json()).then(data => console.log(data));
      } catch(e) {
        alert(e)
          console.log(e)
          return;
      }

  };
}
