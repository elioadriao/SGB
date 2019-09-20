 var $routeProviderReference;
 var app = angular.module('cdg', [require('angular-route'),'angularUtils.directives.dirPagination', 'ngCookies']);
 var basel = require('basel-cli');
 var routes = basel.routes();

 app.config(['$routeProvider', function($routeProvider) {
 	$routeProviderReference = $routeProvider;
 }]);

 app.run(['$rootScope', '$http', '$route', '$location', '$cookieStore', function($rootScope, $http, $route, $location, $cookieStore) {

    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if (!$rootScope.globals.currentUser) {
            $('#menubar').hide();
            $location.path('/login');
        }else{
            $('#menubar').show();
        }
    });

    angular.forEach(routes, function (route) {
    	$routeProviderReference.when( route.when, route.data );
    });

    $routeProviderReference.when('/equilibrio',{
        controller: 'equilibrio',
        templateUrl: 'views/equilibrio.html'
        });
    $routeProviderReference.when('/fluxoCaixa',{
        controller: 'fluxoCaixa',
        templateUrl: 'views/fluxoCaixa.html'
        });
    $routeProviderReference.when('/analise',{
        controller: 'analise',
        templateUrl: 'views/analise.html'
        });
    $routeProviderReference.when('/balanco',{
        controller: 'balanco',
        templateUrl: 'views/balanco.html'
        });
    $routeProviderReference.when('/receita',{
        controller: 'receita',
        templateUrl: 'views/receita.html'
        });
    $routeProviderReference.when('/custoTotal',{
        controller: 'custoTotal',
        templateUrl: 'views/custoTotal.html'
        });
    $routeProviderReference.when('/custoOportunidade',{
        controller: 'custoOportunidade',
        templateUrl: 'views/custoOportunidade.html'
        });
    $routeProviderReference.when('/custoOperacional',{
        controller: 'custoOperacional',
        templateUrl: 'views/custoOperacional.html'
        });
    $routeProviderReference.when('/investimento',{
        controller: 'investimento',
        templateUrl: 'views/investimento.html'
        });
    $routeProviderReference.when('/custoAdm',{
        controller: 'custoAdm',
        templateUrl: 'views/custoAdm.html'
        });
    $routeProviderReference.when('/custoVariavel',{
        controller: 'custoVariavel',
        templateUrl: 'views/custoVariavel.html'
        });
    $routeProviderReference.when('/custoFixo',{
        controller: 'custoFixo',
        templateUrl: 'views/custoFixo.html'
        });
    $routeProviderReference.when('/variacaoRebanho',{
        controller: 'variacaoRebanho',
        templateUrl: 'views/variacaoRebanho.html'
        });
    $routeProviderReference.when('/depreciacoes',{
        controller: 'depreciacoes',
        templateUrl: 'views/depreciacoes.html'
        });
    $routeProviderReference.when('/inventario',{
        controller: 'inventario',
        templateUrl: 'views/inventario.html'
        });
    $routeProviderReference.when('/',{
        controller: 'inicio',
        templateUrl: 'views/inicio.html'
        });;
    $routeProviderReference.when('/login',{
        controller: 'login',
        templateUrl: 'views/login.html'
        });

    $routeProviderReference.otherwise({ redirectTo: '/' });
    $route.reload();
}]);
