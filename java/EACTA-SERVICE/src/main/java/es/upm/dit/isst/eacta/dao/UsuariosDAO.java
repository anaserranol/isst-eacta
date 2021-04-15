package es.upm.dit.isst.eacta.dao;

import java.util.List;

import es.upm.dit.isst.eacta.model.Usuarios;

public interface UsuariosDAO {
	public Usuarios create (Usuarios usuario);
	public Usuarios read (int id);
	public Usuarios update (Usuarios usuario);
	public Usuarios delete (Usuarios usuario);
	public List<Usuarios> readAll ();
}
