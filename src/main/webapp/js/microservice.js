var TheView = Backbone.View.extend({

	events: {
		"click #locate": "locate",
	},

	locate: function(event) {
		event.preventDefault();

		var serviceName = $("#locate-service").val();
		console.log("Locating service... " + serviceName);


		var results = $("#locate-results ul");
		results.empty();
		if (!serviceName) {
			return;
		}

		results.append('<ul>Locating service: ' + serviceName + '</ul>');

		var data = {name: serviceName};
		var jqxhr = jQuery.post("api/locate", JSON.stringify(data), null, "json");
		jqxhr.done(function(data) {
			console.debug("Got data " + JSON.stringify(data));
			results.empty();
			var name = data.name + "." + data.application + ".local";
			results.append('<ul><p class="text-info">Name: ' + name + '</ul>');
			results.append('<ul><p class="text-info">Environment: ' + data.environment + '</ul>');
			results.append('<ul><p class="text-info">Host Address: ' + data.address + '</ul>');
			results.append('<ul><p class="text-info">Name: ' + data.host + '</ul>');
			results.append('<ul><p class="text-info">Container Address: ' + data.containerAddress + '</ul>');
			results.append('<ul><p class="text-info">Version: ' + data.version + '</ul>');
			results.append('<ul><p class="text-info">Response Time (ms): ' + data.responseTime + '</ul>');
		});

		jqxhr.fail(function(jqXHR, textStatus, errorThrown) {
			console.error(jqXHR);
			results.append('<ul><p class="text-danger"> ERROR: unable to find service ' + serviceName + '</p></ul>');
		});


	},

	render: function() {

		var view = this;
		var jqxhr = jQuery.getJSON("api/info");
		jqxhr.done(function(data) {
			console.log("Got data " + JSON.stringify(data));

			var html = [];
			html.push('<div class="col-md-12">');

			var name = data.name + "." + data.application + ".local";
			html.push('<H1><i style="color: #822726;" class="icon-sitemap"></i> Service ' + name + '</H1>');

			html.push('<div class="col-md-12">');
			html.push('<div class="highlight">');
			html.push(serviceDataTemplate(data));
			html.push('</div>');
			html.push('</div>');


			html.push('<div class="col-md-6">');
			html.push('<legend>' + "Find a service" + '</legend>');
			html.push(locateTemplate(data));
			html.push('<div id="locate-results">');
			html.push('<ul class="list-unstyled" style="padding-top: 20px">');
			html.push('</ul">');
			html.push('</div>');
			html.push('</div>');

			html.push('</div>');

			var allHtml = html.join("");

			$(view.el).html(allHtml);

		});

		return this;
	},
});

var serviceDataTemplate = _.template(
	'<form class="form-horizontal" role="form">'

		+ '<div class="form-group">'
    	+ '<label class="col-sm-2 control-label">Environment:</label>'
    	+ '<div class="col-sm-3">'
    	+ '<p class="form-control-static"><%= environment %></p>'
    	+ '</div>'
		+ '</div>'

		+ '<div class="form-group">'
    	+ '<label class="col-sm-2 control-label">IP Address:</label>'
    	+ '<div class="col-sm-3">'
    	+ '<p class="form-control-static"><%= address %></p>'
    	+ '</div>'
		+ '</div>'

		+ '<div class="form-group">'
    	+ '<label class="col-sm-2 control-label">Host:</label>'
    	+ '<div class="col-sm-3">'
    	+ '<p class="form-control-static"><%= host %></p>'
    	+ '</div>'
		+ '</div>'

		+ '<div class="form-group">'
    	+ '<label class="col-sm-2 control-label">Version:</label>'
    	+ '<div class="col-sm-3">'
    	+ '<p class="form-control-static"><%= version %></p>'
    	+ '</div>'
		+ '</div>'

	+ '</form>'
);

var locateTemplate = _.template(
	'<form class="form-inline" role="form">'
	+ '<div class="form-group" style="width: 100%">'
    + '<label class="sr-only" for="locate-service">Service</label>'
    + '<div class="col-md-8">'
    + '<input type="text" class="form-control" id="locate-service" placeholder="service name">'
  	+ '</div>'
  	+ '<button id="locate" type="submit" class="btn btn-md btn-primary">'
  	+ '<span class="glyphicon glyphicon-search"></span>'
  	+ '</button>'
  	+ '</div>'
	+ '</form>'
);



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


