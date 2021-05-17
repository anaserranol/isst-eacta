package es.upm.dit.isst.eacta.model;

import java.io.Serializable;
import java.util.Arrays;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Acta implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	private int codigoAsignatura;
	
	private String acta;	
	private String estado;
	
	public int getCodigoAsignatura() {
		return codigoAsignatura;
	}

	public void setCodigoAsignatura(int codigoAsignatura) {
		this.codigoAsignatura = codigoAsignatura;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}


	public String getActa() {
		return acta;
	}

	public void setActa(String acta) {
		this.acta = acta;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((acta == null) ? 0 : acta.hashCode());
		result = prime * result + codigoAsignatura;
		result = prime * result + ((estado == null) ? 0 : estado.hashCode());
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
		Acta other = (Acta) obj;
		if (acta == null) {
			if (other.acta != null)
				return false;
		} else if (!acta.equals(other.acta))
			return false;
		if (codigoAsignatura != other.codigoAsignatura)
			return false;
		if (estado == null) {
			if (other.estado != null)
				return false;
		} else if (!estado.equals(other.estado))
			return false;
		return true;
	}
	
	
}
