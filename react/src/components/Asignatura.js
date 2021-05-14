import React from "react";
import { Link } from "react-router-dom";
import "../assets/style/Asignatura.css";

export default class Asignaturas extends React.Component {
  render() {
    const { userLogged, subjects, notas } = this.props;
    console.log(notas)
    console.log("AQUII")
    console.log(subjects)
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
                asignatura: asig,
                codAsig: asig.codigo,
                numero: num,
                estado: asig.esfinal,
                fechaPublic: asig.fechaPublicacion,
                fechaRevisi: asig.fechaRevision,
              },
            }}
            hidden={userLogged.rol !== "profesor"}
          >
            <button>Calificaciones</button>
          </Link>
          <p hidden={userLogged.rol !== "alumno"}>Nota {asig.esfinal ? "final" : "provisional"}</p>
          <p hidden={userLogged.rol === "alumno"}>
            {" "}
            Las notas son {asig.esfinal ? "final" : "provisional"}es
          </p>
          <p hidden={asig.esfinal}>
            {" "}
            La fecha provisional de publicacion de notas es:{" "}
            {asig.fechaPublicacion}
          </p>
          <p hidden={asig.esfinal}>
            La fecha de revisión es: {asig.fechaRevision}
          </p>
          <button
            hidden={userLogged.rol !== "alumno" || asig.esfinal}
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
                estado: asig.esfinal ? "final" : "provisional",
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
        //alert(e)
          console.log(e)
          return;
      }

  };
}
