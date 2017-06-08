FROM tomcat:8-jre8
MAINTAINER Nirmata "support@nirmata.com"
  
RUN rm -Rf /usr/local/tomcat/webapps/ROOT
ADD microservice.war /usr/local/tomcat/webapps/ROOT.war
RUN chmod 755 /usr/local/tomcat/webapps/ROOT.war
ADD server.xml /usr/local/tomcat/conf/server.xml

CMD ["catalina.sh", "run"]
