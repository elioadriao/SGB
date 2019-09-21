 var $routeProviderReference;
 var app = angular.module('cdg', [require('angular-route'),'angularUtils.directives.dirPagination']);
 var basel = require('basel-cli');
 var routes = basel.routes();

 app.config(['$routeProvider', function($routeProvider) {
 	$routeProviderReference = $routeProvider;
 }]);

 app.run(['$rootScope', '$http', '$route', '$location', '$window', function($rootScope, $http, $route, $location, $window) {

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        if ($window.localStorage.getItem("chave") == null) {
            $('#menubar').hide();
            $('#infobar').hide();
            $location.path('/autenticacao');
        }else{
            $('#menubar').show();
            $('#infobar').show();
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
    $routeProviderReference.when('/autenticacao',{
        controller: 'autenticacao',
        templateUrl: 'views/autenticacao.html'
        });

    $routeProviderReference.otherwise({ redirectTo: '/' });
    $route.reload();
}]);
