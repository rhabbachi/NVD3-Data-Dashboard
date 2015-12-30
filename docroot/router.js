/**
 * Backbone Router
 *
 * NOTE: To ignore baseURL
 *
 *	Backbone.history.start({
 *			pushState: true,
 *			root: "/public/search/"
 *	});
 *
 **/
define(['backbone', 'recline'], function (Backbone, Recline) {
	console.log('[router] loaded 11');
  var Router = Backbone.Router.extend({
		routes : {
			'dash/comp/' : 'getCompDash' 
		},

//?backend=gdocs&url=https%3A%2F%2Fdocs.google.com%2Fspreadsheet%2Fccc%3Fkey%3D1R0_i_H-InRaQQK6_ECuenLeoAM2TH32edBPbue9c5Rc%23gid%3D0

///?backend=gdoc&url=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1_M45YGdwC8-ZLuphJD5lODAJmx2ANNis63mBlDk32TQ%2Fedit%3Fusp%3Dsharing

		getCompDash : function (queryString) {
			var self = this;
			require(['views/dashCompViews'], function (Views) {
				var params = self.urlDecodeParams(self.parseQueryString(queryString));
        console.log("params", params);
        var model = new Recline.Model.Dataset(params);
        var seriesFields = ['schooltotalstudents', 'schooltotalstudents', 'schooltotalstudents', 'schooltotalstudents'];
        var states = [];
        seriesFields.forEach(function (field) {
          var state = new Recline.Model.ObjectState({
            xfield: 'schoolname',
            seriesFields: [field],
            group: true,
            options: {
              showValues: true,
              tooltips: false,
              showControls: false,
              stacked: true,
              margin: {top: 30, right: 20, bottom: 50, left: 250},
            }
          });
          states.push(state);
        });
				var View = new Views.dashCompView({
                          q : params,
                          metaDataUrl : "http://ncdkanrny2efmnpl.devcloud.acquia-sites.com/schooldashboard",
                          title : "School Comparison Dashboard"
        });
				View.render();
				console.log('getDash', params);
			});
		},
    parseQueryString : function (str) {
      return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
    },
    urlDecodeParams : function (params) {
      var decoded = {}
      console.log("aa", params);
      _.each(params, function (p, k) {
        console.log("decode",p,k);
        decoded[k]= decodeURIComponent(p);
      });
      return decoded;
    },
		_parseQueryString : function (queryString) {
			var params = {};
			if(queryString){
					_.each(
							_.map(decodeURI(queryString).split(/&/g),function(el,i){
									var aux = el.split('='), o = {};
									if(aux.length >= 1){
											var val = undefined;
											if(aux.length == 2)
													val = aux[1];
											o[aux[0]] = val;
									}
									return o;
							}),
							function(o){
									_.extend(params,o);
							}
					);
			}
			return params;
    }
	});

	var AppRouter = new Router();

	AppRouter.on('getDash', function () {
		console.log("Hello get Dash");
	});

	AppRouter.on('defaultRoute', function () {
		console.log('Default route');
	});

	console.log('router', Router, AppRouter);
  Backbone.history.start();
}, function (err) {
  console.log("[router]ERR", err);
});
