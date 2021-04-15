package es.upm.dit.isst.eacta.dao;

import java.util.List;

import es.upm.dit.isst.eacta.model.Asignatura;

public interface AsignaturaDAO {
	public Asignatura create (Asignatura asig);
	public Asignatura read (int codigo);
	public Asignatura update (Asignatura asig);
	public Asignatura delete (Asignatura asig);
	public List<Asignatura> readAll ();
}
