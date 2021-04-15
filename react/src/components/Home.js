import React from "react";
import { userLogout } from "../redux/actions";
import { BrowserRouter as Link } from "react-router-dom";

import "../assets/style/Asignatura.css";
import Asignatura from "./Asignatura";
import Header from "./Header";
import Footer from "./Footer";

export default class Home extends React.Component {
  async componentDidMount() {
    try {
        let response;
      if (this.props.userLogged.rol !== "alumno") {
        // Descargamos las asignaturas del usuario
        response = await fetch(
          "http://localhost:8080/EACTA-SERVICE/rest/Asignaciones/usuario/" +
            this.props.userLogged.id
        );
      } else {
        response = await fetch(
          "http://localhost:8080/EACTA-SERVICE/rest/Calificaciones/alumno/" +
            this.props.userLogged.id
        );
      }
      // Los convertimos a array
      let subs = await response.json();
      console.log(subs)
      let arraysub = [];
      // Todas las asignaturas
      let response2 = await fetch(
        "http://localhost:8080/EACTA-SERVICE/rest/Asignatura/"
      );
      let subs2 = await response2.json();

      subs.map((sub, i) => {
        for (let indexsubs2 in subs2) {
          if (subs2[indexsubs2].codigo == sub.codigoAsignatura)
            arraysub.push(subs2[indexsubs2]);
        }
      });
      if (this.props.userLogged.rol === "alumno") {
        this.props.marks(subs)
      }
      console.log(arraysub);
      this.props.subjs(arraysub);

    } catch (e) {
      alert(e);
    }
  }

  render() {
    console.log(this.props.userLogged);
    console.log(this.props.asig);
    return (
      <div className="todo">
        <Header
          userLogged={this.props.userLogged}
          rol={this.props.userLogged.rol}
          onLogout={() => this.props.onLogout()}
        />
        <Asignatura
          userLogged={this.props.userLogged}
          subjects={this.props.subjects}
          notas={this.props.notas}
        />
        <Footer />
      </div>
    );
  }
}
