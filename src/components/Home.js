import React from "react";
import { userLogout } from "../redux/actions";
import { BrowserRouter as Link} from "react-router-dom";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to="/login"> Login </Link>
          </li>
          <li>
            <Link to="/notas"> Notas </Link>
          </li>
          <li>
            <Link to="/users"> Usuarios </Link>
          </li>
        </ul>
        <h1 id="prueba"> Holi {this.props.userLogged.rol} </h1>
        <button onClick={() => this.props.onLogout()}> Cerrar sesión </button>
      </div>
    );
  }
}
