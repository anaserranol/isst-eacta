package es.upm.dit.isst.eacta.dao;

import java.util.List;

import es.upm.dit.isst.eacta.model.Calificaciones;

public interface CalificacionesDAO {
		
		public Calificaciones create (Calificaciones cal);
		public Calificaciones read (int id);
		public Calificaciones update (Calificaciones cal);
		public Calificaciones delete (Calificaciones cal);
		public List<Calificaciones> readAll ();
		public List<Calificaciones> readAll (int idAsig);
		public List<Calificaciones> readAll (long idAlum);
		
}
