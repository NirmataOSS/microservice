/**
 * Copyright Nirmata 2014
 */

package com.nirmata.mservice;

import java.io.IOException;
import java.net.InetAddress;
import java.util.List;
import java.util.Map;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Splitter;
import com.google.common.collect.Maps;

@Path("/info")
public class GetServiceInfo {

    Logger _logger = LoggerFactory.getLogger(getClass());

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInfo() throws IOException {

        ResponseBuilder bldr = Response.status(Response.Status.OK);
        bldr.type(MediaType.APPLICATION_JSON);

        String json = toJson();
        _logger.debug("Sending response: {}", json);

        bldr.entity(json);
        return bldr.build();
    }

    private String toJson() throws IOException {
        Map<String, Object> response = Maps.newHashMap();

        String name = getEnv("NIRMATA_SERVICE_NAME", "");
        if (name.isEmpty()) {
            name = getEnv("NIRMATA_DESIRED_SERVICE_NAME", "service");
        }

        response.put("name", name);

        String environment = getEnv("NIRMATA_ENVIRONMENT_NAME", "environment");
        response.put("environment", environment);

        String application = getEnv("NIRMATA_APPLICATION_NAME", "application");
        response.put("application", application);

        String version = getEnv("NIRMATA_SERVICE_VERSION", "");
        response.put("version", version);

        String hostName = InetAddress.getLocalHost().getHostName();
        response.put("host", hostName);

        String hostAddr = getEnv("NIRMATA_HOST_ADDRESS", "");
        if (hostAddr != "") {
            response.put("address", hostAddr);
        }

        String[] ports = getHostPort();
        if (ports != null && ports.length == 2) {
            response.put("port", ports[0]);
            response.put("containerPort", ports[1]);
        }

        String containerAddr = InetAddress.getLocalHost().getHostAddress();
        response.put("containerAddress", containerAddr);
        if (hostAddr == "") {
            response.put("address", containerAddr);
        }

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(response);
        return json;
    }

    private String getEnv(String name, String defaultVal) {
        String val = System.getenv(name);
        return (val == null) ? defaultVal : val;
    }

    private String[] getHostPort() {
        String portList = System.getenv("NIRMATA_SERVICE_PORTS");
        if (portList == null) {
            return null;
        }

        List<String> portEntries = Splitter.on(',').splitToList(portList);
        for (String entry : portEntries) {
            List<String> vals = Splitter.on(':').splitToList(entry);
            String type = vals.get(0);
            String hostPort = vals.get(1);
            String containerPort = vals.get(2);

            _logger.debug("Got port value {}:{}:{}", type, hostPort, containerPort);
            return new String[] {
                hostPort,
                containerPort
            };
        }

        return null;
    }
}
