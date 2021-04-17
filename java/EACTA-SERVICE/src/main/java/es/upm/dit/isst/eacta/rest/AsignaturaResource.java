package es.upm.dit.isst.eacta.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import es.upm.dit.isst.eacta.dao.AsignaturaDAOImplementation;
import es.upm.dit.isst.eacta.model.Asignatura;

@Path("/Asignatura")
public class AsignaturaResource {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Asignatura> readAll () {
		return AsignaturaDAOImplementation.getInstance().readAll();
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(Asignatura tnew) throws URISyntaxException {
		Asignatura t = AsignaturaDAOImplementation.getInstance().create(tnew);
		if (t != null) {
            URI uri = new URI("/EACTA-SERVICE/rest/Asignaturas/" + t.getCodigo());
            return Response.created(uri).build();
		}
		return Response.status(Response.Status.NOT_FOUND).build();
	}
	
	@GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response read(@PathParam("id") int id) {
        Asignatura t = AsignaturaDAOImplementation.getInstance().read(id);
        if (t == null)
          return Response.status(Response.Status.NOT_FOUND).build();
        return Response.ok(t, MediaType.APPLICATION_JSON).build();
    }        

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response update(@PathParam("id") int id, Asignatura t) {
            System.out.println("Update request for" + id + " " + t.toString());
        Asignatura told = AsignaturaDAOImplementation.getInstance().read(id);
        if ((told == null) || (!(told.getCodigo() == (t.getCodigo()))))
          return Response.notModified().build();
        AsignaturaDAOImplementation.getInstance().update(t);
        return Response.ok().build();                
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") int  id) {
        Asignatura rold = AsignaturaDAOImplementation.getInstance().read(id);
        if (rold == null)
            return Response.notModified().build();
        AsignaturaDAOImplementation.getInstance().delete(rold);
        return Response.ok().build();
    }
}