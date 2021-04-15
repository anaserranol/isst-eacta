import React from "react";
import { userLogout } from "../redux/actions";
import { BrowserRouter as Link} from "react-router-dom";

import "../assets/style/Asignatura.css"
import Asignatura from "./Asignatura";
import Header from "./Header";
import Footer from "./Footer";

export default class Home extends React.Component {

    async componentDidMount(){
        try {
            // Descargamos las asignaturas del usuario
            let response = await fetch(
              "http://localhost:8080/EACTA-SERVICE/rest/Asignaciones/usuario/" + this.props.userLogged.id 
            );
            // Los convertimos a array
            let subs = await response.json();
            // Se los pasamos a Redux
            let arraysub = [];
            // Todas las asignaturas
            let response2 = await fetch(
                "http://localhost:8080/EACTA-SERVICE/rest/Asignatura/"
            );
            let subs2 = await response2.json();
            subs.map((sub,i) => {
                for (let indexsubs2 in subs2) {
                    if (subs2[indexsubs2].codigo == sub.codigoAsignatura)
                        arraysub.push(subs2[indexsubs2]);
                }
                
            })
            console.log(arraysub)
            this.props.subjs(arraysub)
              
          } catch (e) {
            alert(e);
          }
    }

    render() {
        console.log(this.props.userLogged)
        console.log(this.props.asig)
        return (
            <div className="todo">
              <Header userLogged = {this.props.userLogged} rol = {this.props.userLogged.rol} onLogout={() => this.props.onLogout()}/>
              <Asignatura 
                userLogged={this.props.userLogged}
                subjects={this.props.subjects}
                />
                <Footer />
            </div>
        )
    }
}
