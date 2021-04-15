package es.upm.dit.isst.eacta.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import es.upm.dit.isst.eacta.model.Calificaciones;

public class CalificacionesDAOImplementation implements CalificacionesDAO{
	private static CalificacionesDAOImplementation instancia = null;
	private CalificacionesDAOImplementation() {
		;
	}
	
	public static CalificacionesDAOImplementation getInstance () {
		if ( null == instancia )
			instancia = new CalificacionesDAOImplementation();
		return instancia;
	}
	
	@Override
	public Calificaciones create(Calificaciones Calificaciones) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();
		try {
			session.save(Calificaciones);
		} catch(Exception e) {
			Calificaciones = null;
		} 
		session.getTransaction().commit();
		session.close();    
		return Calificaciones;
	}
	
	@Override
	public Calificaciones read (int id) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		Calificaciones Calificaciones = session.get(Calificaciones.class, id);   
		session.getTransaction().commit();    
		session.close();    
		return Calificaciones;
	}
	
	@Override
	public Calificaciones update(Calificaciones Calificaciones) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		session.saveOrUpdate(Calificaciones);    
		session.getTransaction().commit();    
		session.close();    
		return Calificaciones;
	}
	
	@Override
	public Calificaciones delete(Calificaciones Calificaciones) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		session.delete(Calificaciones);    
		session.getTransaction().commit();    
		session.close();    
		return Calificaciones;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Calificaciones> readAll() {
		List<Calificaciones> Calificacioness = new ArrayList<Calificaciones> ();    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		Calificacioness.addAll(session.createQuery("from Calificaciones").list());    
		session.getTransaction().commit();    
		session.close();    
		return Calificacioness;
	}
	
	@Override
	public List<Calificaciones> readAll(int idAsig) {
		List<Calificaciones> res = new ArrayList<Calificaciones>();
		for (Calificaciones Calificaciones : this.readAll())
			if (Calificaciones.getCodigoAsignatura() == idAsig)
				res.add(Calificaciones);
		return res;
	}
	
	@Override
	public List<Calificaciones> readAll(long idAlum) {
		List<Calificaciones> res = new ArrayList<Calificaciones>();
		for (Calificaciones Calificaciones : this.readAll())
			if (Calificaciones.getAlumnoID() == idAlum)
				res.add(Calificaciones);
		return res;
	}
}
