import React from "react";
import { userLogout } from "../redux/actions";
import { BrowserRouter as Link} from "react-router-dom";

import "../assets/style/Asignatura.css"
import Asignatura from "./Asignatura";
import Header from "./Header";
import Footer from "./Footer";

export default class Home extends React.Component {
    render() {
        return (
            <div className="todo">
              <Header userLogged = {this.props.userLogged} rol = {this.props.userLogged.rol} onLogout={() => this.props.onLogout()}/>
                
                <Asignatura 
                userLogged={this.props.userLogged}
                />
                <Footer />
            </div>
        )
    }
}
