package es.upm.dit.isst.eacta.rest;

import javax.ws.rs.ApplicationPath;

import org.glassfish.jersey.server.ResourceConfig;


@ApplicationPath("rest")
public class eActaApp extends ResourceConfig{
	public eActaApp() {
        packages("es.upm.dit.isst.eacta.rest");
	}
}