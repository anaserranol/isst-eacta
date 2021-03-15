import React from "react";

import Header from "./Header";
import Footer from "./Footer";

export default class Notas extends React.Component {
    render() {
        return (
            <div className="todo">
            <Header userLogged = {this.props.userLogged} rol = {this.props.userLogged.rol} onLogout={() => this.props.onLogout()}/>
              
              <h1>NOTAS</h1>
              <Footer />
          </div>
        )
    }
}