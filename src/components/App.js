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
  subjectsRestart,
  nameRestart
} from "./Constants"

function App(props) {
  const { usersBBDD, userLogged } = props;
  console.log(props)
  return (
    <Router>
      <div className="main">
        <Switch>
          <Route exact path="/login">
            { userLogged.rol !== undefined ? <Redirect to ="/" /> :
            <Login 
              userLogged = {userLogged}
              onLogin = {(email, pass) => {
                let rol = rolRestart;
                let subjects = subjectsRestart;
                let name = nameRestart;
                for (var user in usersBBDD) {
                  if (email == usersBBDD[user].email && pass == usersBBDD[user].password){
                    rol = usersBBDD[user].rol;
                    subjects = usersBBDD[user].subjects;
                    name = usersBBDD[user].name;
                  }
                }
                
                props.dispatch(userLogin(rol, subjects, name));                
              }}
            />
            }
          </Route>
          <Route exact path="/notas">
            {userLogged.rol === undefined ? <Redirect to ="/login"/> : 
              <Notas
              onLogout = {() => props.dispatch(userLogout(rolRestart, subjectsRestart, nameRestart))}
              userLogged = {userLogged}
              />
            }
          </Route>
          <Route exact path="/actas">
            {userLogged.rol === undefined ? <Redirect to ="/login"/> : 
              <Actas
              onLogout = {() => props.dispatch(userLogout(rolRestart, subjectsRestart, nameRestart))}
              userLogged = {userLogged}
              />
            }
          </Route>
          <Route exact path="/users">
            {userLogged.rol === undefined ? <Redirect to ="/login"/> : 
              <Users
              onLogout = {() => props.dispatch(userLogout(rolRestart, subjectsRestart, nameRestart))}
              userLogged = {userLogged}
              />
            }
          </Route>
          <Route exact path="/">
            {userLogged.rol === undefined ? <Redirect to ="/login"/> : 
              <Home 
                onLogout = {() => props.dispatch(userLogout(rolRestart, subjectsRestart, nameRestart))}
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
