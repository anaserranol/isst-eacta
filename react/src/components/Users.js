import React, { useEffect } from "react";
import ReactDom from "react-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import { Type } from "react-bootstrap-table2-editor";

import "../assets/style/Users.css";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

export default function Users(props) {
  console.log(props.userLogged);
  // Para el input de eliminar usuario
  const [num, setNum] = useState("");

  // Para los inputs de añadir usuario
  const [emailU, setEmailU] = useState("");
  const [nombreU, setNombreU] = useState("");
  const [passU, setPassU] = useState("");
  const [rolU, setRolU] = useState("");

  // Para el input de eliminar asignacion
  const [idU, setIdU] = useState("");

  // Para los inputs de añadir asignacion
  const [codA, setCodA] = useState("");
  const [num2, setNum2] = useState("");

  // Para guardar la descarga de la tabla de Asignaciones y Asignaturas
  // Lo vamos a utilizar para rellenar las dos tablas que aparecen
  const [asignac, setAsignac] = useState([]);
  const [asignatu, setAsignatu] = useState([]);

  const usersBBDD = props.usersBBDD;
  // Lleva la información de la tabla de usuarios
  const usersTable = [];

  // Rellenamos la tabla de usuarios mediante la info de la BBDD de los usuarios
  usersBBDD.map((user, num) => {
    usersTable.push({
      id: user.id,
      email: user.email,
      rol: user.rol,
      name: user.nombre,
    });
  });

  // Definimos las columnas a mostras en la tabla de los usuarios
  const columns = [
    {
      dataField: "id",
      text: "Id",
    },
    {
      dataField: "email",
      text: "Usuario",
    },
    {
      dataField: "rol",
      text: "Rol",
      editor: {
        type: Type.SELECT,
        options: [
          {
            value: "admin",
            label: "admin",
          },
          {
            value: "profesor",
            label: "profesor",
          },
          {
            value: "alumno",
            label: "alumno",
          },
          {
            value: "pas",
            label: "pas",
          },
        ],
      },
    },
    {
      dataField: "name",
      text: "Nombre",
    },
  ];

  // Es la tabla con asignaciones que vamos a mostrar
  const subjectsTable = [];
  let a = 0;

  // Rellenamos la tabla asig a mostrar mediante la tabla Asignaciones
  asignac.map((una, i) => {
    // Tomamos el nombre del usuario de la BBDD
    let nombre;
    // Tomamos el acrónimo de la asignatu (descarga Asignaturas)
    let nomasig;
    // Sirve para no coger a los PAS
    let flag;
    let role;
    usersBBDD.map((uno, i) => {
      if (uno.id == una.usuarioID) {
        nombre = uno.nombre;
        flag = uno.rol == "pas" ? false : true;
        role = uno.rol;
      }
    });
    asignatu.map((une, i) => {
      if (une.codigo == una.codigoAsignatura) nomasig = une.acronimo;
    });
    if (flag)
      subjectsTable.push({
        idkey: ++a,
        idUser: una.usuarioID,
        nombre: nombre,
        rol: role,
        nomsub: nomasig,
        sub: una.codigoAsignatura,
        idasig: una.id,
      });
  });

  // Nos sirve para ver si se ha editado algo en la tabla de asignaciones mostrada
  // La referencia para la tabla de usuarios es la BBDD
  const referencia = subjectsTable;

  // Definimos las columnas a mostrar en la tabla de asignaciones
  const columns2 = [
    {
      dataField: "idasig",
      text: "Id Asignación",
    },
    {
      dataField: "idUser",
      text: "IdUsuario",
    },
    {
      dataField: "nombre",
      text: "Nombre",
    },
    {
      dataField: "nomsub",
      text: "Asignatura",
    },
    {
      dataField: "sub",
      text: "Código",
    },
    {
      dataField: "idkey",
      text: "EA",
      hidden: true,
    },
    {
      dataField: "rol",
      text: "rol",
      hidden: true,
    },
  ];

  // Post de la modificacion de usuarios
  const subirUsers = async () => {
    // Para mostrar la alerta si se ha modificado algo
    let alerta = false;
    // Es nuestra referencia
    usersBBDD.map(async (uno, i) => {
      // Vamos si se ha editado algo
      if (
        usersTable[i].email !== uno.email ||
        usersTable[i].rol !== uno.rol ||
        usersTable[i].name !== uno.nombre
      ) {
        alerta = true;
        try {
          await fetch(
            "http://localhost:8080/EACTA-SERVICE/rest/Usuarios/" + uno.id,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: usersBBDD[i].id,
                email: usersTable[i].email,
                nombre: usersTable[i].name,
                password: usersBBDD[i].password,
                rol: usersTable[i].rol,
              }),
            }
          );
        } catch (e) {
          alert("Error al guardar los usuarios.");
          console.log(e);
          return;
        }
      }
    });
    if (alerta) alert("Recargue la página para que se carguen los cambios.");
  };

  // Post para añadir a un usuario
  const addUser = async () => {
    // Comprobamos que no haya ningún campo vacío
    if (passU === "" || emailU === "" || rolU === "" || nombreU === "")
      alert("Hay algún campo vacío");
    // Comprobamos si el rol es correcto
    else if (
      rolU !== "admin" &&
      rolU !== "profesor" &&
      rolU !== "alumno" &&
      rolU !== "pas"
    )
      alert(
        "No existe ese rol. Escriba uno entre: admin, profesor, alumno y pas"
      );
    // Comprobamos si el mail es correcto
    else if (emailU.indexOf("@") === -1)
      alert("Por favor, introduce un email válido");
    else {
      try {
        await fetch("http://localhost:8080/EACTA-SERVICE/rest/Usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: usersBBDD[usersBBDD.length - 1].id + 1,
            email: emailU,
            nombre: nombreU,
            password: passU,
            rol: rolU,
          }),
        });
        // En caso de ser pas, le asignamos todas las asignaturas para que pueda acceder a ellas
        if (rolU === "pas") {
          // Para el id de asignaciones
          let nume = asignac.length + 1;
          // Hacemos un post por asignatura
          asignatu.map(async (una, i) => {
            try {
              await fetch(
                "http://localhost:8080/EACTA-SERVICE/rest/Asignaciones/",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: nume++,
                    codigoAsignatura: una.codigo,
                    usuarioID: usersBBDD[usersBBDD.length - 1].id + 1,
                  }),
                }
              );
            } catch (e) {
              alert("Error al añadir al usuario.");
              console.log(e);
              return;
            }
          });
        }
      } catch (e) {
        alert("Error al añadir al usuario.");
        console.log(e);
        return;
      }
      alert(
        "Usuario añadido con éxito. Recarga la página para ver los cambios."
      );
    }
  };

  // Delete para borrar al usuario
  const deleteUser = async () => {
    // Para ver qué era
    let rol;
    // Comprobamos que no este vacío
    if (num == "") alert("Por favor, introduce un id de usuario");
    // Comprobamos que sea un número
    else if (isNaN(Number(num))) alert("Por favor, introduce un número");
    else {
      // Vemos si es un id de un usuario existente
      let flag = false;
      usersBBDD.map(async (id, i) => {
        if (id.id == Number(num)) {
          flag = true;
          rol = id.rol;
        }
      });
      if (flag) {
        try {
          await fetch(
            "http://localhost:8080/EACTA-SERVICE/rest/Usuarios/" + Number(num),
            {
              method: "DELETE",
            }
          );
        } catch (e) {
          console.log(e);
          return;
        }
        // Tenemos que eliminar las relaciones con la tabla Calificaciones (alumno) o Asignaciones (profe y pas)
        if (rol === "alumno") {
          try {
            // Hacemos una petición a las calificaciones de este alumno
            let response = await fetch(
              "http://localhost:8080/EACTA-SERVICE/rest/Calificaciones/alumno/" +
                Number(num)
            );
            let cali = await response.json();
            // Vemos si tiene alguna
            if (cali[0] !== undefined) {
              // Borramos cada una
              cali.map(async (cal) => {
                try {
                  await fetch(
                    "http://localhost:8080/EACTA-SERVICE/rest/Calificaciones/" +
                      cal.id,
                    {
                      method: "DELETE",
                    }
                  );
                } catch (e) {
                  alert("Error al eliminar la calificación del usuario");
                  console.log(e);
                  return;
                }
              });
            }
          } catch (e) {
            alert("Error al pedir las calificaciones del usuario");
            console.log(e);
            return;
          }
        } else if (rol === "profesor" || rol === "pas") {
          try {
            // Hacemos una petición a las asignaciones de este usuario
            let response2 = await fetch(
              "http://localhost:8080/EACTA-SERVICE/rest/Asignaciones/usuario/" +
                Number(num)
            );
            let asig = await response2.json();
            console.log(asig);
            // Comprobamos que hay alguna
            if (asig[0] !== undefined) {
              console.log("ENTRWE");
              // Borramos cada una
              asig.map(async (as) => {
                console.log(as);
                try {
                  await fetch(
                    "http://localhost:8080/EACTA-SERVICE/rest/Asignaciones/" +
                      as.id,
                    {
                      method: "DELETE",
                    }
                  );
                } catch (e) {
                  alert("Error al eliminar la asignación del usuario");
                  console.log(e);
                  return;
                }
              });
            }
            console.log("NO ENTRE")
          } catch (e) {
            alert("Error al pedir las asignaciones del usuario");
            console.log(e);
            return;
          }
        }
        alert("Usuario eliminado correctamente. Recargue para ver los cambios");
      } else alert("Por favor, introduce un id de usuario real");
    }
  };

  // Misma filosofía que el del usuario pero sin eliminar la relación
  const deleteAsig = async () => {
    if (num2 == "") alert("Por favor, introduce el id de la asignación");
    else if (isNaN(Number(num2))) alert("Por favor, introduce un número");
    else {
      let flag2 = false;
      referencia.map(async (id, i) => {
        if (id.id == Number(num2)) flag2 = true;
      });
      if (flag2) {
        try {
          await fetch(
            "http://localhost:8080/EACTA-SERVICE/rest/Asignaciones/" +
              Number(num2),
            {
              method: "DELETE",
            }
          );
        } catch (e) {
          console.log(e);
          return;
        }
        alert(
          "Asignación eliminada correctamente. Recargue para ver los cambios"
        );
      } else alert("Por favor, introduce un id de asignación real");
    }
  };

  // Misma filosofía que el del usuario
  const addAsig = async () => {
    // Para ver si es una asignatura existente
    let flagCod = false;
    // Para ver si es un usuario existente
    let flagUsu = false;
    // Vemos si esa asignación ya existía
    let estaba = false;
    if (idU == "" || codA == "") alert("Hay algún campo vacío");
    else {
      asignatu.map((asig) => {
        if (asig.codigo === Number(codA)) flagCod = true;
      });
      usersBBDD.map((usu) => {
        if (usu.id === Number(idU) && usu.rol === "profesor") flagUsu = true;
      });
      asignac.map((asigna) => {
        if (
          asigna.codigoAsignatura === Number(codA) &&
          asigna.usuarioID === Number(idU)
        )
          estaba = true;
      });
    }
    if (!flagCod) alert("No existe ese código de asignatura.");
    else if (!flagUsu) alert("Por favor, introduce un id correcto.");
    else if (estaba) alert("Esa asignación ya está creada.");
    else {
      try {
        await fetch("http://localhost:8080/EACTA-SERVICE/rest/Asignaciones", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: asignac[asignac.length - 1].id + 1,
            codigoAsignatura: Number(codA),
            usuarioID: Number(idU),
          }),
        });
      } catch (e) {
        alert("Error al añadir asignación");
        console.log(e);
        return;
      }
      alert(
        "Asignación añadida con éxito. Recarga la página para ver los cambios."
      );
    }
  };

  // Como el componentDidMount -> descargamos la tabla Asignaciones y Asignatura
  useEffect(() => {
    // Se hace asi para evitar un bucle
    const fetchData = async () => {
      try {
        // Descargamos las asignaciones de la url dada
        let response = await fetch(
          "http://localhost:8080/EACTA-SERVICE/rest/Asignaciones"
        );
        // Los convertimos a array
        let ac = await response.json();
        setAsignac(ac);
      } catch (e) {
        alert(e);
      }
    };
    const fetchData2 = async () => {
      try {
        // Descargamos las asignaciones de la url dada
        let response = await fetch(
          "http://localhost:8080/EACTA-SERVICE/rest/Asignatura"
        );
        // Los convertimos a array
        let as = await response.json();
        setAsignatu(as);
      } catch (e) {
        alert(e);
      }
    };

    fetchData();
    fetchData2();
  }, []);
  console.log(asignac);

  return (
    <div className="todo">
      <Header
        userLogged={props.userLogged}
        rol={props.userLogged.rol}
        onLogout={() => props.onLogout()}
      />
      <div className="cuerpo">
        <h1 id="text">USUARIOS</h1>
        <div className="usuTodo">
          <span className="usuarios">
            <div className="tablaUsu">
              <h2>Modificar usuarios</h2>

              <BootstrapTable
                keyField="id"
                data={usersTable}
                columns={columns}
                cellEdit={cellEditFactory({ mode: "click" })}
              />
              <button className="butsub" onClick={() => subirUsers()}>
                {" "}
                Guardar cambios
              </button>
            </div>
            <div className="accionesUsu">
              <h3>Añadir a un nuevo usuario</h3>
              <p>
                Email: &nbsp;
                <input
                  type="email"
                  name="emailU"
                  onChange={(e) => setEmailU(e.target.value)}
                />
                &nbsp; Rol: &nbsp;
                <input
                  type="text"
                  name="rolU"
                  onChange={(e) => setRolU(e.target.value)}
                />
              </p>
              <p>
                Nombre: &nbsp;
                <input
                  type="text"
                  name="NombreU"
                  onChange={(e) => setNombreU(e.target.value)}
                />
                &nbsp;Contraseña: &nbsp;
                <input
                  type="password"
                  name="passU"
                  onChange={(e) => setPassU(e.target.value)}
                />
              </p>
              <button onClick={() => addUser()}> Añadir </button>
              <p></p>
              <h3>Eliminar a un usuario</h3>
              <p>
                {" "}
                Escriba el id del usuario a eliminar &nbsp;
                <input
                  type="text"
                  name="num"
                  onChange={(e) => setNum(e.target.value)}
                />
                <button id="butusdel" onClick={() => deleteUser()}>
                  {" "}
                  Eliminar usuario
                </button>
              </p>
            </div>
          </span>
          <div className="asigTodo">
            <h2>Modificar asignaturas de los profesores</h2>

            <BootstrapTable
              keyField="idkey"
              data={subjectsTable}
              columns={columns2}
            />

            <div className="accionesAsig">
              <h3>Añadir a una nueva asignación</h3>
              IdUsuario: &nbsp;
              <input
                type="text"
                name="idU"
                onChange={(e) => setIdU(e.target.value)}
              />
              &nbsp; Código: &nbsp;
              <input
                type="text"
                name="codA"
                onChange={(e) => setCodA(e.target.value)}
              />
              <button id="butasadd" onClick={() => addAsig()}>
                {" "}
                Añadir asignación
              </button>
              <h3>Eliminar una asignación </h3>
              <p>
                {" "}
                Escriba el id de la asignación a eliminar &nbsp;
                <input
                  type="text"
                  name="num2"
                  onChange={(e) => setNum2(e.target.value)}
                />
                <button id="butasdel" onClick={() => deleteAsig()}>
                  {" "}
                  Eliminar{" "}
                </button>
                <button
                  onClick={() => {
                    console.log(usersBBDD[usersBBDD.length - 1]);
                  }}
                >
                  Pulsa
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
