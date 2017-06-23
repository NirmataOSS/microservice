var TheView = Backbone.View.extend({

	events: {
		"click #locate": "locate",
	},

	locate: function(event) {
		event.preventDefault();

		var serviceName = $("#locate-service").val();
		console.log("Locating service... " + serviceName);


		var results = $("#locate-results");
		results.empty();
		if (!serviceName) {
			return;
		}

        results.empty();		
		results.append('<span class="text-info">Locating service: ' + serviceName + '</span>');

		var data = {name: serviceName};
		var jqxhr = jQuery.post("api/locate", JSON.stringify(data), null, "json");
		jqxhr.done(function(data) {
			console.debug("Got data " + JSON.stringify(data));			
			var hostAddress = data.address;
			if (data.port && data.port != "0") {
				hostAddress += ":" + data.port;
			}

			var containerAddress = data.containerAddress + ":" + data.containerPort;
			results.append('<p class="text-success" style="margin-top: 10px">Container: ' + containerAddress + '</p>');
			results.append('<p class="text-success">On Host: ' + hostAddress + '</p>');

			console.log("Response time (ms): " + data.responseTime);
		});

		jqxhr.fail(function(jqXHR, textStatus, errorThrown) {
			console.error(jqXHR);
			results.append('<p class="text-danger">Unable to locate service instance</p>');
		});
	},

	render: function() {
		
		var view = this;
		var jqxhr = jQuery.getJSON("api/info");
		jqxhr.done(function(data) {
			console.log("Got data " + JSON.stringify(data));

	        document.title = data.name;

			var html = [];
			html.push('<div class="center-block" style="width: 350px; padding-top: 18px">');
			
            html.push('<div class="row">');		
			html.push('<div class="col-md-12 highlight">');
			html.push(serviceDataTemplate(data));
			html.push('</div>');
            html.push('</div>');


			html.push('<div class="row" style="padding-top: 20px">');
			html.push('<legend class="text-center text-muted">' + "Service Discovery" + '</legend>');
			html.push(locateTemplate(data));
            html.push('</div>');
			
			html.push('<div  class="row" style="padding-top: 20px; font-size: 18px" id="locate-results">');
			html.push('</div>');
			
			html.push('</div>');


			var allHtml = html.join("");

			$(view.el).html(allHtml);

		});

		return this;
	},
});

var serviceDataTemplate = _.template(
'<div class="col-md-12" style="text-align: center; height: 100px"> \
    <span class="glyphicon glyphicon-cloud" style="color: green; font-size: 128px; margin: 0px"></span> \
</div> \
<div class="col-md-12" style="text-align: center;"> \
    <p style="font-size: 20px; margin: 5px"><%= name %>.<%= application %>.local</p> \
    <p style="font-size: 20px; margin: 5px"><%= address %>:<%= port %></p> \
</div>');

var locateTemplate = _.template(
'<form class="form-inline" role="form"> \
    <div class="input-group"> \
        <label class="sr-only" for="locate-service">Service</label> \
        <input type="text" class="form-control" id="locate-service" placeholder="service.application.local"> \
        <span class="input-group-btn"> \
            <button id="locate" type="submit" class="btn btn-primary"> \
                <span class="glyphicon glyphicon-search"></span> \
             </button> \
        </span> \
    </div> \
</form>');


window.Router = Backbone.Router.extend({
    routes: {
        "": "run",
    },

	initialize: function () {
	},

	run: function() {
		var view = new TheView();
		var content = $('#content');
		$(content).html(view.render().el);
	},
});

app = new Router();
Backbone.history.start();


