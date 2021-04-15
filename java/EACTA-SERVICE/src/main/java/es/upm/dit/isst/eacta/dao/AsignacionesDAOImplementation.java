package es.upm.dit.isst.eacta.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import es.upm.dit.isst.eacta.model.Asignaciones;

public class AsignacionesDAOImplementation implements AsignacionesDAO{
	private static AsignacionesDAOImplementation instancia = null;
	private AsignacionesDAOImplementation() {
		;
	}
	
	public static AsignacionesDAOImplementation getInstance () {
		if ( null == instancia )
			instancia = new AsignacionesDAOImplementation();
		return instancia;
	}
	
	@Override
	public Asignaciones create(Asignaciones Asignaciones) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();
		try {
			session.save(Asignaciones);
		} catch(Exception e) {
			Asignaciones = null;
		} 
		session.getTransaction().commit();
		session.close();    
		return Asignaciones;
	}
	
	@Override
	public Asignaciones read (int id) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		Asignaciones Asignaciones = session.get(Asignaciones.class, id);   
		session.getTransaction().commit();    
		session.close();    
		return Asignaciones;
	}
	
	@Override
	public Asignaciones update(Asignaciones Asignaciones) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		session.saveOrUpdate(Asignaciones);    
		session.getTransaction().commit();    
		session.close();    
		return Asignaciones;
	}
	
	@Override
	public Asignaciones delete(Asignaciones Asignaciones) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		session.delete(Asignaciones);    
		session.getTransaction().commit();    
		session.close();    
		return Asignaciones;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Asignaciones> readAll() {
		List<Asignaciones> Asignacioness = new ArrayList<Asignaciones> ();    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		Asignacioness.addAll(session.createQuery("from Asignaciones").list());    
		session.getTransaction().commit();    
		session.close();    
		return Asignacioness;
	}
	
	@Override
	public List<Asignaciones> readAll(int codAsig) {
		List<Asignaciones> res = new ArrayList<Asignaciones>();
		for (Asignaciones Asignaciones : this.readAll())
			if (Asignaciones.getCodigoAsignatura() == codAsig)
				res.add(Asignaciones);
		return res;
	}
	
	@Override
	public List<Asignaciones> readAll(long idUsu) {
		List<Asignaciones> res = new ArrayList<Asignaciones>();
		for (Asignaciones Asignaciones : this.readAll())
			if (Asignaciones.getUsuarioID() == idUsu)
				res.add(Asignaciones);
		return res;
	}
}
