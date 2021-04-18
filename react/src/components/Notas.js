import React, { useState }  from "react";

import Header from "./Header";
import Footer from "./Footer";
import FileReader from "./FileReader";

import { useEffect } from "react";

import { useLocation } from "react-router-dom";
import DatePicker from 'react-date-picker';



import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

export default function Notas(props) {

  // Para coger la informacion pasada desde Asignatura
  const location = useLocation();
  const state = location.state;

  // Fecha publicacion
  var fecha = state.asignatura.fechaPublicacion.split("/",3);
  const [value, onChange] = useState(new Date(fecha[2], fecha[1]-1, fecha[0])); // [año, mes, dia]
  
  // Fecha revision
  var fecha2 = state.asignatura.fechaRevision.split("/",3); // [año, mes, dia]
  const [value2, onChange2] = useState(new Date(fecha2[2], fecha2[1]-1, fecha2[0]));

  // Post de la modificacion de las fechas
  const subirFecha = async (num) => {    
    num === 1 ?
    state.asignatura.fechaPublicacion = value.toLocaleDateString()
    : state.asignatura.fechaRevision = value2.toLocaleDateString();
    try {
      await fetch("http://localhost:8080/EACTA-SERVICE/rest/Asignatura/" + state.asignatura.codigo, {
          method: 'POST', 
          headers:{
              "Content-Type": "application/json",
          },
          body: JSON.stringify(state.asignatura)
      }).then(response => response.json()).then(data => console.log(data));
  } catch(e) {
   // alert(e)
      console.log(e)
      return;
  } 
  

  }
  return (
    <div className="todo">
      <Header
        userLogged={props.userLogged}
        rol={props.userLogged.rol}
        onLogout={() => props.onLogout()}
      />
      <h1>{state.asignatura.nombre} ({state.asignatura.acronimo})</h1>
      <FileReader codAsig={state.asignatura.codigo} marks={() => props.marks()}
          usersBBDD={props.usersBBDD} finale={state.estado}/>
      <span hidden={state.estado}>
        <p>Fecha de publicación:  
        <DatePicker
        onChange={onChange}
        value={value}
      />
        </p>
        <button onClick={() => subirFecha(1)}>Modificar fecha</button>

        <p>Fecha de revisión: 
        <DatePicker
        onChange={onChange2}
        value={value2}
      /> </p>
        <button onClick={() => subirFecha(2)}>Modificar fecha</button>
      </span>
      <Footer />
    </div>
  );
}
