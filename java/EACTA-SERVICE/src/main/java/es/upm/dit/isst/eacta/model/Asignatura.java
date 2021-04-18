package es.upm.dit.isst.eacta.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Asignatura implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	private int codigo;

	private String nombre;
	private String acronimo;
	private String fechaPublicacion;
	private String fechaRevision;
	private boolean esfinal;

	public boolean isEsfinal() {
		return esfinal;
	}

	public void setEsfinal(boolean esfinal) {
		this.esfinal = esfinal;
	}

	public Asignatura() {
		super();
	}
	

	public int getCodigo() {
		return codigo;
	}

	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getAcronimo() {
		return acronimo;
	}

	public void setAcronimo(String acronimo) {
		this.acronimo = acronimo;
	}

	public String getFechaPublicacion() {
		return fechaPublicacion;
	}

	public void setFechaPublicacion(String fechaPublicacion) {
		this.fechaPublicacion = fechaPublicacion;
	}

	public String getFechaRevision() {
		return fechaRevision;
	}

	public void setFechaRevision(String fechaRevision) {
		this.fechaRevision = fechaRevision;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((acronimo == null) ? 0 : acronimo.hashCode());
		result = prime * result + codigo;
		result = prime * result + (esfinal ? 1231 : 1237);
		result = prime * result + ((fechaPublicacion == null) ? 0 : fechaPublicacion.hashCode());
		result = prime * result + ((fechaRevision == null) ? 0 : fechaRevision.hashCode());
		result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
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
		Asignatura other = (Asignatura) obj;
		if (acronimo == null) {
			if (other.acronimo != null)
				return false;
		} else if (!acronimo.equals(other.acronimo))
			return false;
		if (codigo != other.codigo)
			return false;
		if (esfinal != other.esfinal)
			return false;
		if (fechaPublicacion == null) {
			if (other.fechaPublicacion != null)
				return false;
		} else if (!fechaPublicacion.equals(other.fechaPublicacion))
			return false;
		if (fechaRevision == null) {
			if (other.fechaRevision != null)
				return false;
		} else if (!fechaRevision.equals(other.fechaRevision))
			return false;
		if (nombre == null) {
			if (other.nombre != null)
				return false;
		} else if (!nombre.equals(other.nombre))
			return false;
		return true;
	}
	
	



	
	
}
