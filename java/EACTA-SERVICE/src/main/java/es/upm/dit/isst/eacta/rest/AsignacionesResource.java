package es.upm.dit.isst.eacta.rest;
import java.util.List;
import java.net.URI;
import java.net.URISyntaxException;


import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import es.upm.dit.isst.eacta.dao.AsignacionesDAOImplementation;
import es.upm.dit.isst.eacta.model.Asignaciones;

@Path("/Asignaciones")
public class AsignacionesResource {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Asignaciones> readAll () {
		return AsignacionesDAOImplementation.getInstance().readAll();
	}
	
	@GET
	@Path("asignatura/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Asignaciones> readAll (@PathParam("id") int id) {
	    return AsignacionesDAOImplementation.getInstance().readAll(id);
	}
	
	@GET
	@Path("usuario/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Asignaciones> readAll (@PathParam("id") long id) {
	    return AsignacionesDAOImplementation.getInstance().readAll(id);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(Asignaciones tnew) throws URISyntaxException {
		Asignaciones t = AsignacionesDAOImplementation.getInstance().create(tnew);
		if (t != null) {
            URI uri = new URI("/EACTA-SERVICE/rest/Asignaciones/" + t.getId());
            return Response.created(uri).build();
		}
		return Response.status(Response.Status.NOT_FOUND).build();
	}
	
	@GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response read(@PathParam("id") int id) {
        Asignaciones t = AsignacionesDAOImplementation.getInstance().read(id);
        if (t == null)
          return Response.status(Response.Status.NOT_FOUND).build();
        return Response.ok(t, MediaType.APPLICATION_JSON).build();
    }        

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response update(@PathParam("id") int id, Asignaciones t) {
            System.out.println("Update request for" + id + " " + t.toString());
        Asignaciones told = AsignacionesDAOImplementation.getInstance().read(id);
        if ((told == null) || (!(told.getId() == (t.getId()))))
          return Response.notModified().build();
        AsignacionesDAOImplementation.getInstance().update(t);
        return Response.ok().build();                
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") int  id) {
        Asignaciones rold = AsignacionesDAOImplementation.getInstance().read(id);
        if (rold == null)
            return Response.notModified().build();
        AsignacionesDAOImplementation.getInstance().delete(rold);
        return Response.ok().build();
    }
}