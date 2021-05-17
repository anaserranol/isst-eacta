--Usuarios

INSERT INTO Usuarios (Id, Nombre, Email, Password, Rol) VALUES (1, 'administrador', 'admin1@test.com', 1234, 'admin');
INSERT INTO Usuarios (Id, Nombre, Email, Password, Rol) VALUES (2, 'profesor1', 'profe1@test.com', 1234, 'profesor');
INSERT INTO Usuarios (Id, Nombre, Email, Password, Rol) VALUES (3, 'profesor2', 'profe2@test.com', 1234, 'profesor');
INSERT INTO Usuarios (Id, Nombre, Email, Password, Rol) VALUES (4, 'alumno1', 'alum1@test.com', 1234, 'alumno');
INSERT INTO Usuarios (Id, Nombre, Email, Password, Rol) VALUES (5, 'alumno2', 'alum2@test.com', 1234, 'alumno');
INSERT INTO Usuarios (Id, Nombre, Email, Password, Rol) VALUES (6, 'secretario1', 'pas1@test.com', 1234, 'pas');
INSERT INTO Usuarios (Id, Nombre, Email, Password, Rol) VALUES (7, 'secretario2', 'pas2@test.com', 1234, 'pas');


--Calificaciones

INSERT INTO Calificaciones (id, codigoAsignatura, alumnoID, nota,revisionpedida) VALUES (1, 100, 4, 7.8, 1);
INSERT INTO Calificaciones (id, codigoAsignatura, alumnoID, nota,revisionpedida) VALUES (2, 200, 4, 9, 0);
INSERT INTO Calificaciones (id, codigoAsignatura, alumnoID, nota,revisionpedida) VALUES (3, 300, 4, 6, 1);
INSERT INTO Calificaciones (id, codigoAsignatura, alumnoID, nota,revisionpedida) VALUES (4, 100, 5, 4, 1);
INSERT INTO Calificaciones (id, codigoAsignatura, alumnoID, nota,revisionpedida) VALUES (5, 200, 5, 2, 0);

--Asignatura

INSERT INTO Asignatura (codigo, nombre, acronimo, fechapublicacion, fecharevision, esfinal) VALUES (100, 'INGENIERÍA DE SISTEMAS Y SERVICIOS TELEMÁTICOS', 'ISST', '15/05/2021', '30/05/2021', 0);
INSERT INTO Asignatura (codigo, nombre, acronimo, fechapublicacion, fecharevision, esfinal) VALUES (200, 'DIMENSIONADO Y OPERACIÓN DE REDES', 'DORE', '21/04/2021', '01/05/2021', 1);
INSERT INTO Asignatura (codigo, nombre, acronimo, fechapublicacion, fecharevision, esfinal) VALUES (300, 'REDES Y SERVICIOS DE RADIO', 'RSRD', '30/05/2021', '10/06/2021', 0);

--Asignaciones

INSERT INTO Asignaciones (Id, codigoAsignatura, ha firmado, usuarioID) VALUES (1, 100, 0, 2);
INSERT INTO Asignaciones (Id, codigoAsignatura, ha firmado, usuarioID) VALUES (2, 200, 0, 2);
INSERT INTO Asignaciones (Id, codigoAsignatura, ha firmado, usuarioID) VALUES (3, 300, 0, 2);
INSERT INTO Asignaciones (Id, codigoAsignatura, ha firmado, usuarioID) VALUES (4, 100, 0, 3);
INSERT INTO Asignaciones (Id, codigoAsignatura, ha firmado, usuarioID) VALUES (5, 200, 0, 3);
INSERT INTO Asignaciones (Id, codigoAsignatura, ha firmado, usuarioID) VALUES (6, 100, 0, 6);
INSERT INTO Asignaciones (Id, codigoAsignatura, ha firmado, usuarioID) VALUES (7, 200, 0, 6);
INSERT INTO Asignaciones (Id, codigoAsignatura, ha firmado, usuarioID) VALUES (8, 300, 0, 6);
INSERT INTO Asignaciones (Id, codigoAsignatura, ha firmado, usuarioID) VALUES (9, 100, 0, 7);
INSERT INTO Asignaciones (Id, codigoAsignatura, ha firmado, usuarioID) VALUES (10, 200, 0, 7);
INSERT INTO Asignaciones (Id, codigoAsignatura, ha firmado, usuarioID) VALUES (11, 300, 0, 7);

--Acta

INSERT INTO Acta (codigoAsignatura, acta, estado) VALUES (100, '', '');
INSERT INTO Acta (codigoAsignatura, acta, estado) VALUES (200, '', '');
INSERT INTO Acta (codigoAsignatura, acta, estado) VALUES (300, '', '');


