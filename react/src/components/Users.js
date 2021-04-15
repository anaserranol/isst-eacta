import React from "react";

import Header from "./Header";
import Footer from "./Footer";

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';

export default class Users extends React.Component {

    render() {
        const usersBBDD = this.props.usersBBDD;
        const usersTable = [];
        usersBBDD.map((user, num) => {
            usersTable.push({id: user.email, rol: user.rol, name: user.nombre})
        })
        return (
            <div className="todo">
            <Header userLogged = {this.props.userLogged} rol = {this.props.userLogged.rol} onLogout={() => this.props.onLogout()}/>
            <h1>USUARIOS</h1>
            <BootstrapTable data = {usersTable}>
                <TableHeaderColumn isKey dataField="id">
                    USUARIO
                </TableHeaderColumn>
                <TableHeaderColumn dataField="rol">
                    ROL
                </TableHeaderColumn>
                <TableHeaderColumn dataField="name">
                    NOMBRE
                </TableHeaderColumn>
            </BootstrapTable>
            <button>Modificar rol</button>
            <Footer />
          </div>
        )
    }
}