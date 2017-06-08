FROM tomcat:8-jre8
MAINTAINER Nirmata "support@nirmata.com"
    
ADD microservice.war /usr/local/tomcat/webapps/ROOT.war
RUN chmod 755 /usr/local/tomcat/webapps/ROOT.war
ADD index.html /usr/local/tomcat/webapps/ROOT/index.html
ADD server.xml /usr/local/tomcat/conf/server.xml

CMD ["catalina.sh", "run"]
