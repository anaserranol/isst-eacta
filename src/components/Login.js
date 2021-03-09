import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Link} from "react-router-dom";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(() => {
        if (props.userLogged.rol !== undefined)
            document.getElementById("pruebaa").innerHTML = `Soy ${props.userLogged.rol}`
    })

    return (
        <div>
            <form>
                <label>
                    Email:
                    <input type="text" name="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Contraseña:
                    <input type="text" name="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </label>                
            </form>
            <button onClick={() => props.onLogin(email,password)}> Iniciar sesión </button>  
            <h1 id="pruebaa"> Soy </h1>
        </div>
    )
    
    
}