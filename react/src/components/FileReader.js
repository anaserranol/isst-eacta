import React from "react";
import Papa from "papaparse";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { CSVLink } from "react-csv";

import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

class FileReader extends React.Component {
  constructor() {
    super();
    this.state = {
      csvfile: undefined,
      data: undefined,
    };
    this.updateData = this.updateData.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      csvfile: event.target.files[0],
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    Papa.parse(csvfile, {
      complete: this.updateData,
      header: true,
    });
  };

  updateData(result) {
    var date = result.data;
    let newdata = [];
    date.map((una, i) => {
      this.props.usersBBDD.map((uno,i) => {
        if (una.alumnoID !== "" && Number(una.alumnoID) === uno.id && uno.rol === "alumno") {
          console.log("entro")
          newdata.push({
            alumnoID: Number(una.alumnoID),
            nombre: una.nombre,
            nota: Number(una.nota),
            revision: una.revision,
          });
        }
      })
      
    });
    console.log(date);
    this.setState({
      data: newdata,
    });
  }

  async componentDidMount() {
    try {
      // Descargamos las calificaciones de la asignatura
      let response = await fetch(
        "http://localhost:8080/EACTA-SERVICE/rest/Calificaciones/asignatura/" +
          this.props.codAsig
      );
      // Los convertimos a array
      let calif = await response.json();
      // Se los pasamos a Redux
      //this.props.marks(calif);
      console.log(calif);
      this.setState({
        data: calif,
      });
      console.log(this.state.data);
    } catch (e) {
      alert(e);
    }
  }

  render() {
    // Array de los alumnos de las calificaciones descargadas
    const alumnos = [];
    const table = [];
    if (this.state.data !== undefined) {
      // Rellenamos el array de alumnos
      this.state.data.map((not, i) => {
        console.log(not.alumnoID);
        for (let us in this.props.usersBBDD) {
          if (not.alumnoID === this.props.usersBBDD[us].id) {
            alumnos.push(this.props.usersBBDD[us]);
            console.log(alumnos);
          }
        }
      });

      // Rellenamos la tabla de las notas que vamos a mostrar
      this.state.data.map((not, i) => {
        if (not.alumnoID !== "")
          table.push({
            alumnoID: not.alumnoID,
            nombre: alumnos[i] === undefined ? not.nombre : alumnos[i].nombre,
            nota: not.nota,
            revision:
              not.revisionPedida !== undefined
                ? not.revisionPedida
                  ? "Sí"
                  : "No"
                : not.revision,
          });
      });
    }
    return (
      <div className="App">
        <input
          className="csv-input"
          type="file"
          ref={(input) => {
            this.filesInput = input;
          }}
          name="file"
          placeholder={null}
          onChange={this.handleChange}
          disabled={this.props.finale}
        />

        <button onClick={this.importCSV} disabled={this.props.finale || this.state.csvfile === undefined}>
          {" "}
          Importar{" "}
        </button>
        <CSVLink data={table}>
          <button disabled={this.props.finale}> Exportar </button>
        </CSVLink>
        <BootstrapTable data={table}>
          <TableHeaderColumn isKey dataField="alumnoID">
            IDUSUARIO
          </TableHeaderColumn>
          <TableHeaderColumn dataField="nombre">NOMBRE</TableHeaderColumn>
          <TableHeaderColumn dataField="nota">NOTA</TableHeaderColumn>
          <TableHeaderColumn dataField="revision">REVISIÓN</TableHeaderColumn>
        </BootstrapTable>
        <button disabled={this.props.finale} onClick={() => this.subirNotas()}>
          Guardar cambios
        </button>
      </div>
    );
  }

  subirNotas = async () => {
    console.log("holi");
    try {
      // Descargamos TODAS las calificaciones
      let response = await fetch(
        "http://localhost:8080/EACTA-SERVICE/rest/Calificaciones"
      );
      console.log("eo1");
      // Las convertimos a array
      let califi = await response.json();
      console.log(califi);
      console.log(this.state.data);
      let idcal = califi.length + 1;

      for (let miindexnota in this.state.data) {
        califi.map(async (una, i) => {
        
          if (this.state.data[miindexnota].alumnoID === una.alumnoID) {
            console.log(miindexnota)
            if (una.codigoAsignatura === this.props.codAsig) {
              console.log("ANTES");
              console.log(una);
              console.log("DESPUES");
              console.log(this.state.data[miindexnota]);
              una.nota = this.state.data[miindexnota].nota;

              await fetch(
                "http://localhost:8080/EACTA-SERVICE/rest/Calificaciones/" +
                  una.id,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(una),
                }
              )
              
            }
          } else {
            console.log(miindexnota);
            this.props.usersBBDD.map(async (uno, i) => {
              if (uno.id === this.state.data[miindexnota].alumnoID && uno.rol === "alumno") {
                console.log(uno.id)
                console.log(idcal)
                await fetch(
                  "http://localhost:8080/EACTA-SERVICE/rest/Calificaciones",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      "id": idcal,
                      "codigoAsignatura": this.props.codAsig,
                      "alumnoID": Number(this.state.data[miindexnota].alumnoID),
                      "nota": Number(this.state.data[miindexnota].nota),
                      "revisionPedida": false
                    }),
                  }
                )
                  
                  idcal++;
              } else {
                alert("Se ha introducido un id que no era de alumno o que no existía.")
              }
            })
          }
        }
        )};
        alert("Se han actualizado las notas con éxito. Recargue para ver los cambios")
      
    } catch (e) {
      alert(e);
      console.log(e);
      return;
    }
  };
}

export default FileReader;
