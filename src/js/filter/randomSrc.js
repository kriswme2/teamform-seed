// http://stackoverflow.com/questions/18845298/forcing-a-ng-src-reload
angular
    .module('teamform')
		.filter('randomSrc', function () {
	    return function (input) {
	        if (input)
	            return input + '?r=' + Math.round(Math.random() * 999999);
	    }
})