import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "../assets/style/Login.css";
import logo from "../assets/img/logo1.png";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
