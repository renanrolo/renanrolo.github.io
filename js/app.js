(function(){
    // var app = angular.module("app", ['ngRoute']);
    var app = angular.module("app", ['ngRoute']);



    app.config(function($routeProvider){
        $routeProvider.when('/', {
            templateUrl: 'Views/main.html'
        });

        $routeProvider.when('/Blog', {
            templateUrl: 'Views/blog.html',
            caseInsensitiveMatch: true
        });

    });


    app.controller('mainCtrl', function ($rootScope) {
        $rootScope.Title = "Renan Rolo"
    });

    app.controller('blogCtrl', function ($rootScope) {
        $rootScope.Title = "Blog"
    });

    

})();