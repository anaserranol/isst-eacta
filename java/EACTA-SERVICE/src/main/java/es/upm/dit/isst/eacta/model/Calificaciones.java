package es.upm.dit.isst.eacta.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Calificaciones implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	private int id;
	
	private int codigoAsignatura;
	private long alumnoID;
	private double nota;
	private boolean revisionPedida;
	
	
	public Calificaciones() {
		super();
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


	public long getAlumnoID() {
		return alumnoID;
	}


	public void setAlumnoID(long alumnoID) {
		this.alumnoID = alumnoID;
	}


	public double getNota() {
		return nota;
	}


	public void setNota(double nota) {
		this.nota = nota;
	}


	public boolean isRevisionPedida() {
		return revisionPedida;
	}


	public void setRevisionPedida(boolean revisionPedida) {
		this.revisionPedida = revisionPedida;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (alumnoID ^ (alumnoID >>> 32));
		result = prime * result + codigoAsignatura;
		result = prime * result + id;
		long temp;
		temp = Double.doubleToLongBits(nota);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + (revisionPedida ? 1231 : 1237);
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
		Calificaciones other = (Calificaciones) obj;
		if (alumnoID != other.alumnoID)
			return false;
		if (codigoAsignatura != other.codigoAsignatura)
			return false;
		if (id != other.id)
			return false;
		if (Double.doubleToLongBits(nota) != Double.doubleToLongBits(other.nota))
			return false;
		if (revisionPedida != other.revisionPedida)
			return false;
		return true;
	}


}
