package es.upm.dit.isst.eacta.dao.test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import es.upm.dit.isst.eacta.dao.AsignaturaDAO;
import es.upm.dit.isst.eacta.dao.AsignaturaDAOImplementation;
import es.upm.dit.isst.eacta.model.Asignatura;
import es.upm.dit.isst.eacta.model.Usuarios;

class AsignaturaDAOImplementationTest {

	@Test

    final void testAsignatura() {

		AsignaturaDAO asidao = AsignaturaDAOImplementation.getInstance();

		Asignatura asi1 = new Asignatura();
		asi1.setEsfinal(true);
		asi1.setCodigo(200);
		asi1.setNombre("INGENIERÍA DE SISTEMAS Y SERVICIOS TELEMÁTICOS");
		asi1.setAcronimo("ISST");
		asi1.setFechaPublicacion("22/5/2021");
		asi1.setFechaRevision("23/5/2021");
		
		//create
		asidao.create(asi1);

		//read
		Asignatura asi2 = asidao.read(200);
		assertEquals(asi2.getCodigo(), asi1.getCodigo());
		assertEquals(asi2.getNombre(), "INGENIERÍA DE SISTEMAS Y SERVICIOS TELEMÁTICOS");
		assertEquals(asi2.getAcronimo(), "ISST");
		assertEquals(asi2.getFechaPublicacion(), "22/5/2021");
		

		//update
		asi1.setEsfinal(false);
		asidao.update(asi1);
		asi2 = asidao.read(200);

		assertNotEquals(asi2.isEsfinal(), true);

		//ReadAll
		List<Asignatura> asi = asidao.readAll();
		assertEquals(asi.size(), 1);
		assertEquals(asi.get(0).getNombre(), "INGENIERÍA DE SISTEMAS Y SERVICIOS TELEMÁTICOS");

		//delete
		asidao.delete(asi1);
		asi2 = asidao.read(200);
		assertNull(asi2);

    }
}