package es.upm.dit.isst.eacta.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Asignaciones implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	private int id;
	private int codigoAsignatura;
	private long usuarioID;
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + codigoAsignatura;
		result = prime * result + id;
		result = prime * result + (int) (usuarioID ^ (usuarioID >>> 32));
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Asignaciones other = (Asignaciones) obj;
		if (codigoAsignatura != other.codigoAsignatura)
			return false;
		if (id != other.id)
			return false;
		if (usuarioID != other.usuarioID)
			return false;
		return true;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCodigoAsignatura() {
		return codigoAsignatura;
	}
	public void setCodigoAsignatura(int codigoAsignatura) {
		this.codigoAsignatura = codigoAsignatura;
	}
	public long getUsuarioID() {
		return usuarioID;
	}
	public void setUsuarioID(long usuarioID) {
		this.usuarioID = usuarioID;
	}
	
	
}
