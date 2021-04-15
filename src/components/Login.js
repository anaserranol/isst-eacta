import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "../assets/style/Login.css";
import logo from "../assets/img/logo1.png";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        props.initUsers(users);
      } catch (e) {
        alert(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="login">
      <div className="logIzq">
        <div className="imgName">
          <img className="logLogo" src={logo} />
          <div className="logActa">
            <h1>eActa</h1>
          </div>
        </div>
      </div>
      <div className="logDer">
        <div className="logLogin">
          <form className="logForm">
            <div className="logContent">
              <div>
                <label> Email </label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label> Contraseña </label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button onClick={() => props.onLogin(email, password)}>
                {" "}
                Iniciar sesión{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
