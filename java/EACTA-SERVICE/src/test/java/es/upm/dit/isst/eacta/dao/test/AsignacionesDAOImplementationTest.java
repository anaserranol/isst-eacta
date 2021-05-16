package es.upm.dit.isst.eacta.dao.test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import es.upm.dit.isst.eacta.dao.AsignacionesDAO;
import es.upm.dit.isst.eacta.dao.AsignacionesDAOImplementation;
import es.upm.dit.isst.eacta.model.Asignaciones;
import es.upm.dit.isst.eacta.model.Calificaciones;

class AsignacionesDAOImplementationTest {

	@Test

    final void testAsignaciones() {

		AsignacionesDAO asidao = AsignacionesDAOImplementation.getInstance();

		Asignaciones asi1 = new Asignaciones();
		asi1.setId(13);
		asi1.setCodigoAsignatura(200);
		asi1.setUsuarioID(4);
		
		//create
		asidao.create(asi1);

		//read
		Asignaciones asi2 = asidao.read(13);
		assertEquals(asi2.getId(), asi1.getId());
		assertEquals(asi2.getCodigoAsignatura(), 200);
		assertEquals(asi2.getUsuarioID(), 4);

		//update
		asi1.setCodigoAsignatura(100);
		asidao.update(asi1);
		asi2 = asidao.read(13);

		assertNotEquals(asi2.getCodigoAsignatura(), 200);

		//ReadAll
		List<Asignaciones> asi = asidao.readAll();
		assertEquals(asi.size(), 1);
		assertEquals(asi.get(0).getCodigoAsignatura(), 100);

		List<Asignaciones> asicod = asidao.readAll(100);
		assertEquals(asicod.size(), 1);
		assertEquals(asicod.get(0).getUsuarioID(), 4);
		
		List<Asignaciones> asiid = asidao.readAll(asi1.getUsuarioID());
		assertEquals(asiid.size(), 1);
		assertEquals(asiid.get(0).getCodigoAsignatura(), 100);

		//delete
		asidao.delete(asi1);
		asi2 = asidao.read(13);
		assertNull(asi2);

    }
}