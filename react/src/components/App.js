import React from "react";
import '../assets/style/App.css';
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { useCookies } from 'react-cookie';
import {useEffect} from 'react'

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
  userLogin, 
  saveMarks
} from "../redux/actions"

// Importamos las constantes
import {
  rolRestart,
  nameRestart,
  idRestart,
} from "./Constants"

function App(props) {
  const { usersBBDD, userLogged, marks} = props;
  console.log(props)
  const [cookies, setCookie] = useCookies(['rol', 'name','id']);
  console.log("COOKIES")
  console.log(cookies);

  function onChange (email, pass) {
    let rol = rolRestart;
    let name = nameRestart;
    let id = idRestart;
    for (var user in usersBBDD) {
      if (email === usersBBDD[user].email && pass === usersBBDD[user].password){
        rol = usersBBDD[user].rol;
        name = usersBBDD[user].nombre;
        id = usersBBDD[user].id;
       
        setCookie('rol', usersBBDD[user].rol, {path: '/'});
        setCookie('name', usersBBDD[user].nombre, {path: '/'});
        setCookie('id', usersBBDD[user].id, {path: '/'});
      }
    }
    console.log(id)

    props.dispatch(userLogin(rol, name, id));  
  }

  function logOut () {
    setCookie('id', "", {path: '/'});
    setCookie('rol', "", {path: '/'});
    setCookie('name', "", {path: '/'});
  }

  useEffect(() => {
    // Se hace asi para evitar un bucle
    const fetchData = async () => {
      try {
        // Descargamos los usuarios de la url dada
        let response = await fetch(
          "http://localhost:8080/EACTA-SERVICE/rest/Usuarios"
        );
        // Los convertimos a array
        let users = await response.json();
        // Se los pasamos a Redux
        console.log("Cargando")
        props.dispatch(initUsers(users));
      } catch (e) {
        alert(e);
      }
    };
    fetchData();
    props.dispatch(userLogin(cookies.rol, cookies.name, cookies.id))
  }, []);

  console.log("USERLOGG")
  console.log(userLogged)
  console.log("BBDD")
  console.log(usersBBDD)
  return (
    <Router>
      <div className="main">
        <Switch>
          <Route exact path="/login">
            { (cookies.rol === undefined || cookies.rol === "") ? 
            <Login 
            userLogged = {cookies}
            onLogin = {(email, pass) => onChange(email,pass)}
          /> :
            
            cookies.rol === "admin" ? <Redirect to ="/users" /> : <Redirect to ="/" /> 
            
            }
          </Route>
          <Route exact path="/notas">
            {(cookies.rol === undefined || cookies.rol === "" || cookies.rol === "admin") ? <Redirect to ="/login"/> : 
              <Notas
              onLogout = {() => logOut()}
              userLogged = {cookies}
              subjects = {props.subjects}
              marks = {(marks) => props.dispatch(saveMarks(marks))}
              notas = {marks}
              usersBBDD = {usersBBDD}
              />
            }
          </Route>
          <Route exact path="/actas">
            {(cookies.rol === undefined || cookies.rol === "" || cookies.rol === "admin") ? <Redirect to ="/login"/> : 
              <Actas
              onLogout = {() => logOut()}
              userLogged = {cookies}
              />
            }
          </Route>
          <Route exact path="/users">
            {(cookies.rol === undefined || cookies.rol === "" || cookies.rol !== "admin") ? <Redirect to ="/login"/> : 
              <Users
              onLogout = {() => logOut()}
                userLogged = {cookies}
                usersBBDD = {usersBBDD}
              />
            }
          </Route>
          <Route path="/">
            {(cookies.rol === undefined || cookies.rol === "" || cookies.rol === "admin") ? <Redirect to ="/login"/> : 
              <Home 
                onLogout = {() => logOut()}
                userLogged = {cookies}
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
