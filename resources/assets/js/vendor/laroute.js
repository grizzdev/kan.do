(function () {

    var laroute = (function () {

        var routes = {

            absolute: false,
            rootUrl: 'https://gmr.dev',
            routes : [{"host":null,"methods":["GET","HEAD"],"uri":"__clockwork\/{id}\/{direction?}\/{count?}","name":null,"action":"Clockwork\Support\Laravel\Controllers\CurrentController@getData"},{"host":null,"methods":["GET","HEAD"],"uri":"__clockwork","name":null,"action":"Clockwork\Support\Laravel\Controllers\CurrentController@webRedirect"},{"host":null,"methods":["GET","HEAD"],"uri":"__clockwork\/app","name":null,"action":"Clockwork\Support\Laravel\Controllers\CurrentController@webIndex"},{"host":null,"methods":["GET","HEAD"],"uri":"__clockwork\/assets\/{path}","name":null,"action":"Clockwork\Support\Laravel\Controllers\CurrentController@webAsset"},{"host":null,"methods":["GET","HEAD"],"uri":"api\/user","name":null,"action":"Closure"},{"host":null,"methods":["GET","HEAD"],"uri":"cms","name":null,"action":"App\Http\Controllers\CMS\DashboardController@index"},{"host":null,"methods":["GET","HEAD"],"uri":"cms\/products","name":"products.index","action":"App\Http\Controllers\CMS\ProductsController@index"},{"host":null,"methods":["GET","HEAD"],"uri":"cms\/products\/create","name":"products.create","action":"App\Http\Controllers\CMS\ProductsController@create"},{"host":null,"methods":["POST"],"uri":"cms\/products","name":"products.store","action":"App\Http\Controllers\CMS\ProductsController@store"},{"host":null,"methods":["GET","HEAD"],"uri":"cms\/products\/{product}","name":"products.show","action":"App\Http\Controllers\CMS\ProductsController@show"},{"host":null,"methods":["GET","HEAD"],"uri":"cms\/products\/{product}\/edit","name":"products.edit","action":"App\Http\Controllers\CMS\ProductsController@edit"},{"host":null,"methods":["PUT","PATCH"],"uri":"cms\/products\/{product}","name":"products.update","action":"App\Http\Controllers\CMS\ProductsController@update"},{"host":null,"methods":["DELETE"],"uri":"cms\/products\/{product}","name":"products.destroy","action":"App\Http\Controllers\CMS\ProductsController@destroy"},{"host":null,"methods":["GET","HEAD"],"uri":"cms\/categories","name":"categories.index","action":"App\Http\Controllers\CMS\CategoriesController@index"},{"host":null,"methods":["GET","HEAD"],"uri":"cms\/categories\/create","name":"categories.create","action":"App\Http\Controllers\CMS\CategoriesController@create"},{"host":null,"methods":["POST"],"uri":"cms\/categories","name":"categories.store","action":"App\Http\Controllers\CMS\CategoriesController@store"},{"host":null,"methods":["GET","HEAD"],"uri":"cms\/categories\/{category}","name":"categories.show","action":"App\Http\Controllers\CMS\CategoriesController@show"},{"host":null,"methods":["GET","HEAD"],"uri":"cms\/categories\/{category}\/edit","name":"categories.edit","action":"App\Http\Controllers\CMS\CategoriesController@edit"},{"host":null,"methods":["PUT","PATCH"],"uri":"cms\/categories\/{category}","name":"categories.update","action":"App\Http\Controllers\CMS\CategoriesController@update"},{"host":null,"methods":["DELETE"],"uri":"cms\/categories\/{category}","name":"categories.destroy","action":"App\Http\Controllers\CMS\CategoriesController@destroy"},{"host":null,"methods":["GET","HEAD"],"uri":"robots.txt","name":null,"action":"App\Http\Controllers\Site\HomeController@robots"},{"host":null,"methods":["GET","HEAD"],"uri":"humans.txt","name":null,"action":"App\Http\Controllers\Site\HomeController@humans"},{"host":null,"methods":["GET","HEAD"],"uri":"site.webmanifest","name":null,"action":"App\Http\Controllers\Site\HomeController@webmanifest"},{"host":null,"methods":["GET","HEAD"],"uri":"browserconfig.xml","name":null,"action":"App\Http\Controllers\Site\HomeController@browserconfig"},{"host":null,"methods":["GET","HEAD"],"uri":"crossdomain.xml","name":null,"action":"App\Http\Controllers\Site\HomeController@crossdomain"},{"host":null,"methods":["GET","HEAD"],"uri":"sitemap.xml","name":null,"action":"App\Http\Controllers\Site\HomeController@sitemap"},{"host":null,"methods":["GET","HEAD"],"uri":"\/","name":null,"action":"App\Http\Controllers\Site\HomeController@page"}],
            prefix: '',

            route : function (name, parameters, route) {
                route = route || this.getByName(name);

                if ( ! route ) {
                    return undefined;
                }

                return this.toRoute(route, parameters);
            },

            url: function (url, parameters) {
                parameters = parameters || [];

                var uri = url + '/' + parameters.join('/');

                return this.getCorrectUrl(uri);
            },

            toRoute : function (route, parameters) {
                var uri = this.replaceNamedParameters(route.uri, parameters);
                var qs  = this.getRouteQueryString(parameters);

                if (this.absolute && this.isOtherHost(route)){
                    return "//" + route.host + "/" + uri + qs;
                }

                return this.getCorrectUrl(uri + qs);
            },

            isOtherHost: function (route){
                return route.host && route.host != window.location.hostname;
            },

            replaceNamedParameters : function (uri, parameters) {
                uri = uri.replace(/\{(.*?)\??\}/g, function(match, key) {
                    if (parameters.hasOwnProperty(key)) {
                        var value = parameters[key];
                        delete parameters[key];
                        return value;
                    } else {
                        return match;
                    }
                });

                // Strip out any optional parameters that were not given
                uri = uri.replace(/\/\{.*?\?\}/g, '');

                return uri;
            },

            getRouteQueryString : function (parameters) {
                var qs = [];
                for (var key in parameters) {
                    if (parameters.hasOwnProperty(key)) {
                        qs.push(key + '=' + parameters[key]);
                    }
                }

                if (qs.length < 1) {
                    return '';
                }

                return '?' + qs.join('&');
            },

            getByName : function (name) {
                for (var key in this.routes) {
                    if (this.routes.hasOwnProperty(key) && this.routes[key].name === name) {
                        return this.routes[key];
                    }
                }
            },

            getByAction : function(action) {
                for (var key in this.routes) {
                    if (this.routes.hasOwnProperty(key) && this.routes[key].action === action) {
                        return this.routes[key];
                    }
                }
            },

            getCorrectUrl: function (uri) {
                var url = this.prefix + '/' + uri.replace(/^\/?/, '');

                if ( ! this.absolute) {
                    return url;
                }

                return this.rootUrl.replace('/\/?$/', '') + url;
            }
        };

        var getLinkAttributes = function(attributes) {
            if ( ! attributes) {
                return '';
            }

            var attrs = [];
            for (var key in attributes) {
                if (attributes.hasOwnProperty(key)) {
                    attrs.push(key + '="' + attributes[key] + '"');
                }
            }

            return attrs.join(' ');
        };

        var getHtmlLink = function (url, title, attributes) {
            title      = title || url;
            attributes = getLinkAttributes(attributes);

            return '<a href="' + url + '" ' + attributes + '>' + title + '</a>';
        };

        return {
            // Generate a url for a given controller action.
            // laroute.action('HomeController@getIndex', [params = {}])
            action : function (name, parameters) {
                parameters = parameters || {};

                return routes.route(name, parameters, routes.getByAction(name));
            },

            // Generate a url for a given named route.
            // laroute.route('routeName', [params = {}])
            route : function (route, parameters) {
                parameters = parameters || {};

                return routes.route(route, parameters);
            },

            // Generate a fully qualified URL to the given path.
            // laroute.route('url', [params = {}])
            url : function (route, parameters) {
                parameters = parameters || {};

                return routes.url(route, parameters);
            },

            // Generate a html link to the given url.
            // laroute.link_to('foo/bar', [title = url], [attributes = {}])
            link_to : function (url, title, attributes) {
                url = this.url(url);

                return getHtmlLink(url, title, attributes);
            },

            // Generate a html link to the given route.
            // laroute.link_to_route('route.name', [title=url], [parameters = {}], [attributes = {}])
            link_to_route : function (route, title, parameters, attributes) {
                var url = this.route(route, parameters);

                return getHtmlLink(url, title, attributes);
            },

            // Generate a html link to the given controller action.
            // laroute.link_to_action('HomeController@getIndex', [title=url], [parameters = {}], [attributes = {}])
            link_to_action : function(action, title, parameters, attributes) {
                var url = this.action(action, parameters);

                return getHtmlLink(url, title, attributes);
            }

        };

    }).call(this);

    /**
     * Expose the class either via AMD, CommonJS or the global object
     */
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return laroute;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = laroute;
    }
    else {
        window.laroute = laroute;
    }

}).call(this);

