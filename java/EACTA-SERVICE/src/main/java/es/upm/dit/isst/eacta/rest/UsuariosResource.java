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

import es.upm.dit.isst.eacta.dao.UsuariosDAOImplementation;
import es.upm.dit.isst.eacta.model.Usuarios;

@Path("/Usuarios")
public class UsuariosResource {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Usuarios> readAll () {
		return UsuariosDAOImplementation.getInstance().readAll();
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(Usuarios tnew) throws URISyntaxException {
		Usuarios t = UsuariosDAOImplementation.getInstance().create(tnew);
		if (t != null) {
            URI uri = new URI("/EACTA-SERVICE/rest/Usuarios/" + t.getId());
            return Response.created(uri).build();
		}
		return Response.status(Response.Status.NOT_FOUND).build();
	}
	
	@GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response read(@PathParam("id") int id) {
        Usuarios t = UsuariosDAOImplementation.getInstance().read(id);
        if (t == null)
          return Response.status(Response.Status.NOT_FOUND).build();
        return Response.ok(t, MediaType.APPLICATION_JSON).build();
    }        

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response update(@PathParam("id") int id, Usuarios t) {
            System.out.println("Update request for" + id + " " + t.toString());
        Usuarios told = UsuariosDAOImplementation.getInstance().read(id);
        if ((told == null) || (!(told.getId() == (t.getId()))))
          return Response.notModified().build();
        UsuariosDAOImplementation.getInstance().update(t);
        return Response.ok().build();                
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") int  id) {
        Usuarios rold = UsuariosDAOImplementation.getInstance().read(id);
        if (rold == null)
            return Response.notModified().build();
        UsuariosDAOImplementation.getInstance().delete(rold);
        return Response.ok().build();
    }
}