FROM nirmata/tomcat8-custom
MAINTAINER Nirmata "support@nirmata.com"

ENV JAVA_OPTS  -Dport.http.nonssl=80

RUN chmod 755 /usr/local/bin/run
ADD microservice.war /opt/tomcat/webapps/catalog.war
ADD index.html /opt/tomcat/webapps/ROOT/index.html
RUN chmod 755 /opt/tomcat/webapps/catalog.war

EXPOSE 80

CMD /usr/local/bin/run
