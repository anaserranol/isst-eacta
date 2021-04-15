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
  saveSubjects,
  initUsers,
  userLogin, userLogout,
  saveMarks
} from "../redux/actions"

// Importamos las constantes
import {
  rolRestart,
  subjectsRestart,
  nameRestart,
  idRestart,
  marksRestart
} from "./Constants"

function App(props) {
  const { usersBBDD, userLogged, marks} = props;
  console.log(props)
  return (
    <Router>
      <div className="main">
        <Switch>
          <Route exact path="/login">
            { userLogged.rol !== undefined ? userLogged.rol === "admin" ? <Redirect to ="/users" /> : <Redirect to ="/" /> :
            <Login 
              initUsers = {(users) => props.dispatch(initUsers(users))}
              userLogged = {userLogged}
              onLogin = {(email, pass) => {
                let rol = rolRestart;
                let name = nameRestart;
                let id = idRestart;
                for (var user in usersBBDD) {
                  if (email == usersBBDD[user].email && pass == usersBBDD[user].password){
                    rol = usersBBDD[user].rol;
                    name = usersBBDD[user].nombre;
                    id = usersBBDD[user].id;
                  }
                }
                
                props.dispatch(userLogin(rol, name, id));                
              }}
            />
            }
          </Route>
          <Route exact path="/notas">
            {userLogged.rol === undefined ? <Redirect to ="/login"/> : 
              <Notas
              onLogout = {() => props.dispatch(userLogout(rolRestart, subjectsRestart, nameRestart, idRestart, marksRestart))}
              userLogged = {userLogged}
              subjects = {props.subjects}
              marks = {(marks) => props.dispatch(saveMarks(marks))}
              notas = {marks}
              usersBBDD = {usersBBDD}
              />
            }
          </Route>
          <Route exact path="/actas">
            {userLogged.rol === undefined ? <Redirect to ="/login"/> : 
              <Actas
              onLogout = {() => props.dispatch(userLogout(rolRestart, subjectsRestart, nameRestart, idRestart, marksRestart))}
              userLogged = {userLogged}
              />
            }
          </Route>
          <Route exact path="/users">
            {userLogged.rol === undefined ? <Redirect to ="/login"/> : 
              <Users
                onLogout = {() => props.dispatch(userLogout(rolRestart, subjectsRestart, nameRestart, idRestart, marksRestart))}
                userLogged = {userLogged}
                usersBBDD = {usersBBDD}
              />
            }
          </Route>
          <Route exact path="/">
            {userLogged.rol === undefined ? <Redirect to ="/login"/> : 
              <Home 
                onLogout = {() => props.dispatch(userLogout(rolRestart, subjectsRestart, nameRestart, idRestart, marksRestart))}
                userLogged = {userLogged}
                subjs = {(subj) => props.dispatch(saveSubjects(subj))}
                subjects = {props.subjects}
                marks = {(marks) => props.dispatch(saveMarks(marks))}
                notas = {props.marks}
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
