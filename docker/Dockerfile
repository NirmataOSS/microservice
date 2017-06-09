FROM tomcat:8-jre8
MAINTAINER Nirmata "support@nirmata.com"
  
ADD microservice.war /usr/local/tomcat/webapps/service.war
RUN chmod 755 /usr/local/tomcat/webapps/service.war
ADD server.xml /usr/local/tomcat/conf/server.xml
ADD index.html /usr/local/tomcat/webapps/ROOT/index.html

CMD ["catalina.sh", "run"]
