package es.upm.dit.isst.eacta.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import es.upm.dit.isst.eacta.model.Asignatura;

public class AsignaturaDAOImplementation implements AsignaturaDAO{
	private static AsignaturaDAOImplementation instancia = null;
	private AsignaturaDAOImplementation() {
		;
	}
	
	public static AsignaturaDAOImplementation getInstance () {
		if ( null == instancia )
			instancia = new AsignaturaDAOImplementation();
		return instancia;
	}
	
	@Override
	public Asignatura create(Asignatura Asignatura) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();
		try {
			session.save(Asignatura);
		} catch(Exception e) {
			Asignatura = null;
		} 
		session.getTransaction().commit();
		session.close();    
		return Asignatura;
	}
	
	@Override
	public Asignatura read (int codigo) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		Asignatura Asignatura = session.get(Asignatura.class, codigo);   
		session.getTransaction().commit();    
		session.close();    
		return Asignatura;
	}
	
	@Override
	public Asignatura update(Asignatura Asignatura) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		session.saveOrUpdate(Asignatura);    
		session.getTransaction().commit();    
		session.close();    
		return Asignatura;
	}
	
	@Override
	public Asignatura delete(Asignatura Asignatura) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		session.delete(Asignatura);    
		session.getTransaction().commit();    
		session.close();    
		return Asignatura;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Asignatura> readAll() {
		List<Asignatura> Asignaturas = new ArrayList<Asignatura> ();    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		Asignaturas.addAll(session.createQuery("from Asignatura").list());    
		session.getTransaction().commit();    
		session.close();    
		return Asignaturas;
	}

}
