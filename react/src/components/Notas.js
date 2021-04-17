import React from "react";

import Header from "./Header";
import Footer from "./Footer";

import { useEffect } from "react";

import { useLocation } from "react-router-dom";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

export default function Notas(props) {
  const location = useLocation();
  const state = location.state;
  useEffect(() => {
    // Se hace asi para evitar un bucle
    const fetchData = async () => {
      try {
        // Descargamos las calificaciones de la asignatura
        let response = await fetch(
          "http://localhost:8080/EACTA-SERVICE/rest/Calificaciones/asignatura/" +
            state.codAsig
        );
        // Los convertimos a array
        let calif = await response.json();
        // Se los pasamos a Redux
        props.marks(calif);
      } catch (e) {
        alert(e);
      }
    };
    fetchData();
  }, []);
  const notasTable = [];
  const alumnos = [];
  console.log(state.fechaPublic)
  
  props.notas.map((not, i) => {
    for (let us in props.usersBBDD) {
      if (not.alumnoID === props.usersBBDD[us].id) 
      alumnos.push(props.usersBBDD[us]);
    }
  });
  props.notas.map((not, i) => {
    notasTable.push({
      id: alumnos[i].nombre,
      nota: not.nota,
      revision: not.revisionPedida ? "Sí" : "No",
    });
  });
  var data = [
    { id: "alumno1", nota: state.calificaciones[0][state.numero] },
    { id: "alumno2", nota: state.calificaciones[1][state.numero] },
  ];

  return (
    <div className="todo">
      <Header
        userLogged={props.userLogged}
        rol={props.userLogged.rol}
        onLogout={() => props.onLogout()}
      />
      <h1>{state.usuario}</h1>
      <BootstrapTable data={notasTable}>
        <TableHeaderColumn isKey dataField="id">
          ALUMNO
        </TableHeaderColumn>
        <TableHeaderColumn dataField="nota">NOTA</TableHeaderColumn>
        <TableHeaderColumn dataField="revision">
          REVISIÓN PEDIDA
        </TableHeaderColumn>
      </BootstrapTable>
      <button disabled={state.estado }>Importar</button>
      <button disabled={state.estado}>Modificar</button>
      <button disabled={state.estado}>Guardar cambios</button>
      <button>Exportar</button>
      <span hidden={state.estado}>
        <p>Fecha de publicación: { state.fechaPublic.dayOfMonth + "/" + state.fechaPublic.monthValue + "/" +state.fechaPublic.year} </p>
        <button>Modificar fechas</button>
        <form className="fechas" method="POST">
           <label for="name">Date</label>
           <input type="date" id="date" name="date" value="<%= state ? state.fechaPublic.toDateString() : ''%>"  data-date="" date-date-format="YYYY-MM-DD"/>
        </form>
        <p>Fecha de revisión: {state.fechaRevisi.dayOfMonth + "/" + state.fechaRevisi.monthValue + "/" +state.fechaRevisi.year} </p>
        <button>Modificar fechas</button>
      </span>
      <Footer />
    </div>
  );
}
