/**
 * Copyright Nirmata 2014
 */

package com.nirmata.mservice;

import java.io.IOException;
import java.net.InetAddress;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.ResponseBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Maps;

@Path("/info")
public class GetServiceInfo {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInfo() {

        ResponseBuilder bldr = Response.status(HttpServletResponse.SC_OK);
        bldr.type(MediaType.APPLICATION_JSON);

        try {
            String json = toJson();
            bldr.entity(json);
            return bldr.build();
        } catch (Throwable t) {
            return Response.serverError().build();
        }
    }

    private String toJson() throws IOException {
        Map<String, Object> response = Maps.newHashMap();

        String name = System.getenv("NIRMATA_SERVICE_NAME");
        response.put("name", name);

        String environment = System.getenv("NIRMATA_ENVIRONMENT_NAME");
        response.put("environment", environment);

        String application = System.getenv("NIRMATA_APPLICATION_NAME");
        response.put("application", application);

        String version = System.getenv("NIRMATA_SERVICE_VERSION");
        response.put("version", version);

        String hostName = InetAddress.getLocalHost().getHostName();
        response.put("host", hostName);

        String hostAddr = System.getenv("NIRMATA_HOST_ADDRESS");
        response.put("address", hostAddr);

        String containerAddr = InetAddress.getLocalHost().getHostAddress();
        response.put("containerAddress", containerAddr);
        
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(response);
        return json;
    }
}
