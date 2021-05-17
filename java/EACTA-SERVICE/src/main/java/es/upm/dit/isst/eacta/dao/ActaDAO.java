package es.upm.dit.isst.eacta.dao;

import java.util.List;

import es.upm.dit.isst.eacta.model.Acta;

public interface ActaDAO {
	public Acta create (Acta acta);
	public Acta read (int id);
	public Acta update (Acta acta);
	public Acta delete (Acta acta);
	public List<Acta> readAll ();
}
