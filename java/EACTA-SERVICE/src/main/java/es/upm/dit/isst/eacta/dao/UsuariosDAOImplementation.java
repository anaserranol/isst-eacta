package es.upm.dit.isst.eacta.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import es.upm.dit.isst.eacta.model.Usuarios;

public class UsuariosDAOImplementation implements UsuariosDAO{
	private static UsuariosDAOImplementation instancia = null;
	private UsuariosDAOImplementation() {
		;
	}
	
	public static UsuariosDAOImplementation getInstance () {
		if ( null == instancia )
			instancia = new UsuariosDAOImplementation();
		return instancia;
	}
	
	@Override
	public Usuarios create(Usuarios Usuarios) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();
		try {
			session.save(Usuarios);
		} catch(Exception e) {
			Usuarios = null;
		} 
		session.getTransaction().commit();
		session.close();    
		return Usuarios;
	}
	
	@Override
	public Usuarios read (int id) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		Usuarios Usuarios = session.get(Usuarios.class, id);   
		session.getTransaction().commit();    
		session.close();    
		return Usuarios;
	}
	
	@Override
	public Usuarios update(Usuarios Usuarios) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		session.saveOrUpdate(Usuarios);    
		session.getTransaction().commit();    
		session.close();    
		return Usuarios;
	}
	
	@Override
	public Usuarios delete(Usuarios Usuarios) {    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		session.delete(Usuarios);    
		session.getTransaction().commit();    
		session.close();    
		return Usuarios;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Usuarios> readAll() {
		List<Usuarios> Usuarios = new ArrayList<Usuarios> ();    
		Session session = SessionFactoryService.get().openSession();    
		session.beginTransaction();    
		Usuarios.addAll(session.createQuery("from Usuarios").list());    
		session.getTransaction().commit();    
		session.close();    
		return Usuarios;
	}

}
