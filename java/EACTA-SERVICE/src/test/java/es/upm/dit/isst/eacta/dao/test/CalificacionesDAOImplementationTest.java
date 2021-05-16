package es.upm.dit.isst.eacta.dao.test;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import es.upm.dit.isst.eacta.dao.CalificacionesDAO;
import es.upm.dit.isst.eacta.dao.CalificacionesDAOImplementation;
import es.upm.dit.isst.eacta.model.Calificaciones;
import es.upm.dit.isst.eacta.model.Usuarios;

class CalificacionesDAOImplementationTest {

	@Test

    final void testCalificaciones() {

		CalificacionesDAO caldao = CalificacionesDAOImplementation.getInstance();

		Calificaciones cal1 = new Calificaciones();
		cal1.setId(5);
		cal1.setCodigoAsignatura(200);
		cal1.setAlumnoID(6);
		cal1.setNota(6.3);
		cal1.setRevisionPedida(false);
		
		//create
		caldao.create(cal1);

		//read
		Calificaciones cal2 = caldao.read(5);
		assertEquals(cal2.getCodigoAsignatura(), cal1.getCodigoAsignatura());
		assertEquals(cal2.getAlumnoID(), 6);
		assertEquals(cal2.getNota(), 6.3);
		
		//update
		cal1.setRevisionPedida(true);
		caldao.update(cal1);
		cal2 = caldao.read(5);

		assertNotEquals(cal2.isRevisionPedida(), false);

		//ReadAll
		List<Calificaciones> cal = caldao.readAll();
		assertEquals(cal.size(), 1);
		assertEquals(cal.get(0).getCodigoAsignatura(), 200);

		List<Calificaciones> calasi = caldao.readAll(200);
		assertEquals(calasi.size(), 1);
		assertEquals(calasi.get(0).getAlumnoID(), 6);
		
		List<Calificaciones> calalu = caldao.readAll(cal1.getAlumnoID());
		assertEquals(calalu.size(), 1);
		assertEquals(calalu.get(0).getCodigoAsignatura(), 200);
		
		//delete
		caldao.delete(cal1);
		cal2 = caldao.read(5);
		assertNull(cal2);

    }
}