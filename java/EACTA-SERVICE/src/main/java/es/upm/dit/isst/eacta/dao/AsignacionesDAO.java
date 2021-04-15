package es.upm.dit.isst.eacta.dao;

import java.util.List;

import es.upm.dit.isst.eacta.model.Asignaciones;

public interface AsignacionesDAO {
	public Asignaciones create (Asignaciones asignac);
	public Asignaciones read (int id);
	public Asignaciones update (Asignaciones asignac);
	public Asignaciones delete (Asignaciones asignac);
	public List<Asignaciones> readAll ();
	public List<Asignaciones> readAll (int codAsig);
	public List<Asignaciones> readAll (long idUsu);
}
