package es.upm.dit.isst.eacta.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import es.upm.dit.isst.eacta.model.Acta;

public class ActaDAOImplementation implements ActaDAO{
	private static ActaDAOImplementation instancia = null;
	private ActaDAOImplementation() {
		;
	}
	
	public static ActaDAOImplementation getInstance () {
		if ( null == instancia )
			instancia = new ActaDAOImplementation();
		return instancia;
	}
	
	@Override
	public Acta create(Acta Acta) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();
		try {
			session.save(Acta);
		} catch(Exception e) {
			Acta = null;
		} 
		session.getTransaction().commit();
		session.close();    
		return Acta;
	}
	
	@Override
	public Acta read (int id) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		Acta Acta = session.get(Acta.class, id);   
		session.getTransaction().commit();    
		session.close();    
		return Acta;
	}
	
	@Override
	public Acta update(Acta Acta) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		session.saveOrUpdate(Acta);    
		session.getTransaction().commit();    
		session.close();    
		return Acta;
	}
	
	@Override
	public Acta delete(Acta Acta) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		session.delete(Acta);    
		session.getTransaction().commit();    
		session.close();    
		return Acta;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Acta> readAll() {
		List<Acta> Acta = new ArrayList<Acta> ();    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		Acta.addAll(session.createQuery("from Acta").list());    
		session.getTransaction().commit();    
		session.close();    
		return Acta;
	}

}
