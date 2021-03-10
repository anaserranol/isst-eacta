import React, { Component } from "react";
import '../assets/style/App.css';
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch, useParams} from "react-router-dom";

// Importamos componentes
import Home from "./Home";
import Login from "./Login";
import Notas from "./Notas";
import Users from "./Users";
import Actas from "./Actas";

// Importamos las acciones
import {
  userLogin, userLogout,
} from "../redux/actions"

// Importamos las constantes
import {
  rolRestart,
  subjectsRestart
} from "./Constants"

function App(props) {
  const { usersBBDD, userLogged } = props;
  console.log(props)
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to ="/"> Home </Link>
          </li>
          <li>
            <Link to ="/login"> Login </Link>
          </li>
          <li>
            <Link to ="/notas"> Notas </Link>
          </li>
          <li>
            <Link to ="/users"> Usuarios </Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/login">
            { userLogged.rol !== undefined ? <Redirect to ="/" /> :
            <Login 
              userLogged = {userLogged}
              onLogin = {(email, pass) => {
                let rol = rolRestart;
                let subjects = subjectsRestart;
                for (var user in usersBBDD) {
                  if (email == usersBBDD[user].email && pass == usersBBDD[user].password){
                    rol = usersBBDD[user].rol;
                    subjects = usersBBDD[user].subjects;
                  }
                }
                
                props.dispatch(userLogin(rol, subjects));                
              }}
            />
            }
          </Route>
          <Route exact path="/notas">
            <Notas />
          </Route>
          <Route exact path="/actas">
            <Actas />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/">
            {userLogged.rol === undefined ? <Redirect to ="/login"/> : 
              <Home 
                onLogout = {() => props.dispatch(userLogout(rolRestart, subjectsRestart))}
                userLogged = {userLogged}
              /> 
            }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


function mapStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(App);
