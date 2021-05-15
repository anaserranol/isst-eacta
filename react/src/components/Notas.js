import React, { useState }  from "react";

import Header from "./Header";
import Footer from "./Footer";
import FileReader from "./FileReader";

import { useEffect } from "react";

import { useLocation } from "react-router-dom";
import DatePicker from 'react-date-picker';



import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

export default function Notas(props) {

  const [notas, setNotas] = useState([]);
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


// Enviar mail

const enviaNotas = async () => {
  try{
  let response = await fetch(
    "http://localhost:8080/EACTA-SERVICE/rest/Calificaciones"
  );
  // Los convertimos a array
  let notar = await response.json();
  setNotas(notar);
} catch (e) {
  alert(e);
}
  console.log(notas)
  let usuarios = props.usersBBDD;
  var calificaciones = [];
  var nota = [];
  let codigo = state.asignatura.codigo;
  for (let i = 0; i < notas.length; i++) {
      for (let j = 0; j < usuarios.length; j++) {
        if (notas[i].codigoAsignatura == codigo && usuarios[j].id == notas[i].alumnoID){
          let nota2 = [usuarios[j].email, usuarios[j].nombre, notas[i].nota];
          calificaciones.push(nota2);
          console.log(calificaciones)
        }
      }
    
  }

  for (let i = 0; i < calificaciones.length; i++) {
    console.log(calificaciones)
    mail(calificaciones[i][0], calificaciones[i][1], calificaciones[i][2], state.asignatura.acronimo);
    console.log("Correo enviado a " + calificaciones[i][0]);
  }
}

const mail = (address, name, grade, subject) => {
  var API_KEY = '8a400fe3bdd514ce6387fc9534fd79e5-6e0fd3a4-66c1597a';
  var DOMAIN = 'sandbox2c9e8cc6c40b46b79f70aeb1761521a7.mailgun.org';
  var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

  let receiver = address;
  let nombre = name;
  let nota = grade;
  let asignatura = subject;
  let text = 'Hola, ' + nombre + ', le informamos que ha obtenido un ' + nota + ' en la asignatura de '+ asignatura + '.';
  let texthtml = '<html> <body> Buenas, ' +nombre+ ', le informamos que ha obtenido un ' +nota+' en la asignatura de '+ asignatura +'. <br> <a href="http://localhost:3000/" class="btn-primary" itemprop="url">Acceder a la plataforma de eActa</a>. </body> </html>'

  const data = {
      from: 'eActa <noreply@eacta.com>',
      to: receiver,
      subject: 'Calificaciones',
      text: text,
      html: texthtml
  };

  mailgun.messages().send(data, (error, body) => {
      console.log(body);
  });
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
        <p>
        <button onClick={() => enviaNotas()}>Enviar notas por correo</button>
        </p>
      </span>
      <Footer />
    </div>
  );
}

