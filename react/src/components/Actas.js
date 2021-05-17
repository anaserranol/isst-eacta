import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

import firebase from 'firebase'

import Header from "./Header";
import Footer from "./Footer";

import acta from "../assets/img/acta.svg";

import "../assets/style/Actas.css";

import { StaticRouter, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


export default function Actas(props) {
  const location = useLocation();
  const state = location.state;
  const userLogged = props.userLogged;

  const [todasNotas, setTodasNotas] = useState([]);
  const [flagFirmadoTodos, setFlagFirmadoTodos] = useState(false);

  const nombreActa = "acta" + state.acronimo;

  const [actaTodo, setActaTodo] = useState([]);
  const [firmado, setFirmado] = useState(false);
  const [idAsig, setIdAsig] = useState(0);
  const [asignatura, setAsignatura] = useState();

  const [subido, setSubido] = useState(false)

  // Para subir y descargar pdf
  const config = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: ".appspot.com",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  }
  if (!firebase.apps.length){
  firebase.initializeApp(config)
  } else {
    firebase.app()
  }
  const descargar = async () => {
    let pdf;
    let email = "";
    if (userLogged.rol !== "pas")
      email = userLogged.email
    try {
      await fetch(
        "http://localhost:8080/EACTA-SERVICE/rest/Acta/" + state.codigo,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codigoAsignatura: state.codigo,
            acta: "https://firebasestorage.googleapis.com/v0/b/pruebas-62c11.appspot.com/o/pdf%2F" + nombreActa + "?alt=media&token=7e752f04-11d0-4105-91e8-596bd92a17d5",
            estado: email
          }),
        }
      );
      let response = await fetch(
        "https://firebasestorage.googleapis.com/v0/b/pruebas-62c11.appspot.com/o/pdf%2F" + nombreActa + "?alt=media&token=7e752f04-11d0-4105-91e8-596bd92a17d5"
      );
      pdf = await response.blob();
      console.log(pdf)
      const fileURL = URL.createObjectURL(pdf)
      window.open(fileURL)
      alert("Recargue la página para poder firmar")
    } catch (e) {
      console.log(e)
    }
  }
  const prueba3 = async () => {
    
    await fetch(
      "http://localhost:8080/EACTA-SERVICE/rest/Asignatura/" + state.codigo,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo: state.codigo,
          acronimo: state.acronimo,
          esfinal: false,
          fechaPublicacion: asignatura.fechaPublicacion,
          fechaRevision: asignatura.fechaRevision,
          nombre: state.nomAsig
        }),
      }
    );
  }

  const prueba = async () => {
    console.log("pasan cosas");
    try {
      await fetch(
        "http://localhost:8080/EACTA-SERVICE/rest/Acta/" + state.codigo,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codigoAsignatura: state.codigo,
            acta: "",
            //estado: "anasele1d@gmail.com",
            estado: ""
          }),
        }
      );
    } catch (e) {
      alert("Error al añadir asignación");
      console.log(e);
      return;
    }
    alert(
      "Asignación añadida con éxito. Recarga la página para ver los cambios."
    );
  };

  const prueba2 = async () => {
    console.log("pasan cosas");
    try {
      await fetch(
        "http://localhost:8080/EACTA-SERVICE/rest/Asignaciones/" + idAsig,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: idAsig,
            codigoAsignatura: state.codigo,
            haFirmado: false,
            usuarioID: userLogged.id
          }),
        }
      );
    } catch (e) {
      alert("Error al añadir asignación");
      console.log(e);
      return;
    }
    await fetch(
      "http://localhost:8080/EACTA-SERVICE/rest/Asignatura/" + state.codigo,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo: state.codigo,
          acronimo: state.acronimo,
          esfinal: false,
          fechaPublicacion: "12/5/2021",
          fechaRevision: "16/6/2021",
          nombre: state.nomAsig
        }),
      }
    );
    alert(
      "Asignación añadida con éxito. Recarga la página para ver los cambios."
    );

  };


  console.log(state.fr)
  const subir = (event, email) => {
    firebase.auth().signInWithEmailAndPassword(email, "12341234").then((userCrential) => {
      subirArchivo(event);
    }).catch((error) => {
      alert(error.message)
    })
  }

  const subirArchivo =(event) => {
    const storageRef = firebase.storage().ref(`pdf/${nombreActa}`);
    const task = storageRef.put(event.target.files[0]);
    console.log(task.snapshot.downloadURL);
    setSubido(true);
  }

  const liberar = async () => {
    if(subido){
    try {
      await fetch(
        "http://localhost:8080/EACTA-SERVICE/rest/Acta/" + state.codigo,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codigoAsignatura: state.codigo,
            acta: "https://firebasestorage.googleapis.com/v0/b/pruebas-62c11.appspot.com/o/pdf%2F" + nombreActa + "?alt=media&token=7e752f04-11d0-4105-91e8-596bd92a17d5",
            estado: ""
          }),
        }
      );
      await fetch(
        "http://localhost:8080/EACTA-SERVICE/rest/Asignaciones/" + idAsig,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: idAsig,
            codigoAsignatura: state.codigo,
            haFirmado: true,
            usuarioID: userLogged.id
          }),
        }
      );
 
          // Descargamos las calificaciones de la asignatura
        let response = await fetch(
          "http://localhost:8080/EACTA-SERVICE/rest/Asignaciones/asignatura/" +
            state.codigo
        );
      
      // Los convertimos a array
      let firmas = await response.json();
        let flag = true;
        firmas.map(fir => {
          props.usersBBDD.map (usu => {
            if(fir.haFirmado === false && fir.usuarioID === usu.id && usu.rol === "profesor") {
              flag = false;
            }
          })
        })
       if (flag) {
         try{
           console.log(state)
        await fetch(
          "http://localhost:8080/EACTA-SERVICE/rest/Asignatura/" + state.codigo,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              codigo: state.codigo,
              acronimo: state.acronimo,
              esfinal: flag,
              fechaPublicacion: asignatura.fechaPublicacion,
              fechaRevision: asignatura.fechaRevision,
              nombre: state.nomAsig
            }),
          }
        );
       } catch (e) {
        alert(e)
      }
      alert("Vuelva atrás para finalizar el cambio.")
    }

    } catch (e) {
      alert("Error al subir acta");
      console.log(e);
      return;
    }
    alert(
      "Acta subida con éxito. Recarga la página para ver los cambios."
    );
    } else {
      alert("No has seleccionado un archivo")
    }
  }


  // Como el componentDidMount -> descargamos el acta
  useEffect(() => {
    // Se hace asi para evitar un bucle
    const fetchData = async () => {
      try {
        // Descargamos las asignaciones de la url dada
        let response = await fetch(
          "http://localhost:8080/EACTA-SERVICE/rest/Acta/" + state.codigo
        );
        // Los convertimos a array
        let acta = await response.json();
        setActaTodo(acta);
      } catch (e) {
        alert(e);
      }
    };
    const fetchData2 = async () => {
      try {
        // Descargamos las asignaciones de la url dada
        let response = await fetch(
          "http://localhost:8080/EACTA-SERVICE/rest/Asignaciones/usuario/" +
            props.userLogged.id
        );
        // Los convertimos a array
        let usuario = await response.json();
        usuario.map(as => {
          if (as.codigoAsignatura === state.codigo){
            setFirmado(as.haFirmado);
            setIdAsig(as.id)
          }
          
        })
       
      } catch (e) {
        alert(e);
      }
    };

    const fetchData3 = async() => {
      try {
        // Descargamos las calificaciones de la asignatura
      let response = await fetch(
        "http://localhost:8080/EACTA-SERVICE/rest/Calificaciones/asignatura/" +
          state.codigo
      );
      // Los convertimos a array
      let calif = await response.json();
      // Se los pasamos a Redux
      //this.props.marks(calif);
      console.log(calif);
      setTodasNotas(calif);
      } catch (e) {
        alert(e)
      }
    }

    const fetchData4 = async() => {
      try {
        // Descargamos las calificaciones de la asignatura
      let response = await fetch(
        "http://localhost:8080/EACTA-SERVICE/rest/Asignatura/" +
          state.codigo
      );
      // Los convertimos a array
      let calif = await response.json();
      // Se los pasamos a Redux
      //this.props.marks(calif);
      console.log(calif);
      setAsignatura(calif);
      } catch (e) {
        alert(e)
      }
    }

    fetchData();
    fetchData2();
    fetchData3();
    fetchData4()
  }, []);


  const enviaNot = async () => {

    let asignaciones;
    let users;
    try {
      let response = await fetch(
        "http://localhost:8080/EACTA-SERVICE/rest/Asignaciones/"
      );
      asignaciones = await response.json();

      let response2 = await fetch(
        "http://localhost:8080/EACTA-SERVICE/rest/Usuarios/"
      );
      users = await response2.json();
    } catch (e) {
      alert(e);
    }

    var usuarios = [];
    for (let i = 0; i < asignaciones.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (
          asignaciones[i].codigoAsignatura == state.codigo &&
          users[j].id == asignaciones[i].usuarioID && users[j].rol !== "pas"
        ) {
          let users2 = [users[j].email, users[j].nombre];
          usuarios.push(users2);
          console.log(usuarios);
        }
      }
    }

    for (let i = 0; i < usuarios.length; i++) {
      console.log(usuarios);
      mail(usuarios[i][0], usuarios[i][1], state.nomAsig);
      console.log("Correo enviado a " + usuarios[i][0]);
    }
  };

  const mail = (address, nombre, subject) => {
    var API_KEY = "";
    var DOMAIN = "";
    var mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

    let receiver = address;
    let name = nombre;
    let asignatura = subject;
    let text =
      "Hola, " +
      name +
      ", ya están disponibles para firmar las actas de la asignatura de " +
      asignatura +
      ".";
    let texthtml =
      "<html> <body> Buenas, " +
      name +
      ", ya están disponibles para firmar las actas de la asignatura de " +
      asignatura +
      '. <br> <a href="http://localhost:3000/" class="btn-primary" itemprop="url">Acceder a la plataforma de eActa</a>. </body> </html>';

    const data = {
      from: "eActa <noreply@eacta.com>",
      to: receiver,
      subject: "Calificaciones",
      text: text,
      html: texthtml,
    };

    mailgun.messages().send(data, (error, body) => {
      console.log(body);
    });
  };

  const exportPDF = async () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const asignatura = state.acronimo;
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Acta de " + asignatura;
    const headers = [["Id", "Nombre alumno", "Nota"]];

    const califNom = [];
    todasNotas.map((una) => {
      props.usersBBDD.map((user) => {
        if (una.alumnoID === user.id) {
          let notaC = {
            id: una.alumnoID,
            nombre: user.nombre,
            nota: una.nota,
          };
          califNom.push(notaC);
        }
      });
    });

    const data = califNom.map((elt) => [elt.id, elt.nombre, elt.nota]);
    console.log(data);
    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save(nombreActa + ".pdf");
    //document.getElementById("aaa");
  };

  const url =
    "//firmaelectronica.gob.es/Home/Ciudadanos/ElegirCertificadoTutoriales.html?dId=C_1";
  return (
    <div className="todo">
      <Header
        userLogged={userLogged}
        rol={userLogged.rol}
        onLogout={() => props.onLogout()}
      />
      <div className="actaSpace">
        <img className="actaPDF" src={acta} alt="actapdf" />
        <div>
          <h1>Actas de {state.acronimo}</h1>
          
          <p hidden={userLogged.rol !== "pas"}>
            Las actas están{" "}
            {state.estado === "final" ? "firmadas" : "sin firmar"}
          </p>
          <p hidden={userLogged.rol === "pas" || firmado}>
            El acta está disponible para firmar
          </p>
          
          <div>
          <button
            onClick={() => enviaNot()}
            hidden={userLogged.rol !== "profesor"}
            disabled={state.estado === "final"}
          >
            Notificar
          </button>
         
          <button disabled={actaTodo.acta !== "" || actaTodo.estado !== ""} 
          hidden={userLogged.rol === "pas"} onClick={() => exportPDF()}>
            Generar acta
          </button>
          <a href={url} target="_blank">
            <button hidden={userLogged.rol === "pas"} disabled={firmado || actaTodo.acta === ""}>Firma digital</button>
          </a>
          <p
            hidden={
              actaTodo.estado !== " " || actaTodo.estado !== "" || state.estado
            }
          >
            El acta se está firmando por otro profesor, vuelva más tarde
          </p>
          <button
            disabled={
              (actaTodo.acta === "" && actaTodo.estado === "") ||
              (actaTodo.estado !== "" && actaTodo.estado !== userLogged.email) ||
              !state.estado   || firmado
            } hidden={userLogged.rol === "pas"}
            onClick={() => descargar()}
          >
            Descargar para firmar
          </button>
          <button
            disabled={(actaTodo.estado === "" && actaTodo.acta !== "") ||
              (actaTodo.estado !== "" && actaTodo.estado !== userLogged.email) ||
              !state.estado  
            } hidden={userLogged.rol === "pas"}
            onClick={() => liberar()}
          >
            Subir acta firmada
          </button>
          <p hidden={state.estado}>El acta ya está firmada</p>
          <p hidden={!firmado}>El acta ya lo has firmado </p>
          <button hidden={state.estado !== "final"} onClick={() => descargar()}>
            Descargar acta final
          </button>
           <input type='file' onChange={(event) => subir(event, userLogged.email)} disabled={firmado || 
            (actaTodo.estado !== "" && actaTodo.estado !== userLogged.email && actaTodo.acta !== "")}
            hidden={userLogged.rol === "pas"}/>
       { /*   
      <button onClick={() => prueba3()}>Je</button>
        <button onClick={() => prueba()}> Dale</button>
        <button onClick={() => prueba2()}> Dale2</button>
           */
       }  
        </div>
        </div>
        
        
      </div>
      <Footer />
    </div>
  );
}
