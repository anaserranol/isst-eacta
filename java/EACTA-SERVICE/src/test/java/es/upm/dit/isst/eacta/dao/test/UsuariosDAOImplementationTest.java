package es.upm.dit.isst.eacta.dao.test;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import es.upm.dit.isst.eacta.dao.UsuariosDAO;
import es.upm.dit.isst.eacta.dao.UsuariosDAOImplementation;
import es.upm.dit.isst.eacta.model.Usuarios;

class UsuariosDAOImplementationTest {

	@Test

    final void testUsuarios() {

		UsuariosDAO usdao = UsuariosDAOImplementation.getInstance();

		Usuarios us1 = new Usuarios();
		us1.setId(5);
		us1.setNombre("alumno1");
		us1.setEmail("alum1@test.com");
		us1.setPassword("1234");
		us1.setRol("alumno");
		
		//create
		usdao.create(us1);

		//read
		Usuarios us2 = usdao.read(5);
		assertEquals(us2.getEmail(), us1.getEmail());
		assertEquals(us2.getNombre(), "alumno1");

		//update
		us1.setPassword("4321");
		usdao.update(us1);
		us2 = usdao.read(5);

		assertNotEquals(us2.getPassword(), "1234");

		//ReadAll
		List<Usuarios> us = usdao.readAll();
		assertEquals(us.size(), 1);
		assertEquals(us.get(0).getNombre(), "alumno1");

		//delete
		usdao.delete(us1);
		us2 = usdao.read(5);
		assertNull(us2);

    }
}