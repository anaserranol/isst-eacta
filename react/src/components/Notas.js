import React from "react";

import Header from "./Header";
import Footer from "./Footer";

import { useLocation } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';

export default function Notas (props) {

    const location = useLocation();
    const state = location.state;
    var data = [
        {id: "alumno1", nota: state.calificaciones[0][state.numero] },
        {id: "alumno2", nota: state.calificaciones[1][state.numero]}
    ];

        return (
            <div className="todo">
            <Header userLogged = {props.userLogged} rol = {props.userLogged.rol} onLogout={() => props.onLogout()}/>
            <h1>{state.usuario}</h1>
            <BootstrapTable data = {data}>
                <TableHeaderColumn isKey dataField="id">
                    ALUMNO
                </TableHeaderColumn>
                <TableHeaderColumn dataField="nota">
                    NOTA
                </TableHeaderColumn>
            </BootstrapTable>
            <button disabled={state.estado === "final"}>Importar</button>
            <button disabled={state.estado === "final"}>Modificar</button>
            <button disabled={state.estado === "final"}>Guardar cambios</button>
            <button>Exportar</button>
            <span hidden={state.estado === "final"}>
                <p>Fecha de publicación: {state.fechaPublic} </p>
                <button>Modificar fechas</button>
                <p>Fecha de revisión: {state.fechaRevisi} </p>
                <button>Modificar fechas</button>
            </span>
            <Footer />
          </div>
        )
}