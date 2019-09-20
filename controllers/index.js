"use strict";
app.controller("index", function($scope, $rootScope, $location, AuthenticationService){
	$scope.app = basel.config;
	$scope.menus = basel.menu();

	var PAGES = {
		"/inventario" : 0,
		"/depreciacoes" : 1,
		"/variacaoRebanho" : 2,
		"/custoFixo" : 3,
		"/custoVariavel" : 4,
		"/custoAdm" : 5,
		"/investimento" : 6,
		"/custoOperacional" : 7,
		"/custoOportunidade" : 8,
		"/custoTotal" : 9,
		"/receita" : 10,
		"/balanco" : 11,
		"/analise" : 12,
		"/fluxoCaixa" : 13,
		"/equilibrio" : 14
		};
	var ATUAL = { key : -1, value : ""};

	$scope.logoff = function (){
		AuthenticationService.ClearCredentials();
		localStorage.clear();
		$location.path('/login');
	}

	$scope.menu = function (){
		$('#menu').modal('show');
	}

	$scope.redir = function(location){
		ATUAL.key = PAGES[location];
		ATUAL.value = location;

		console.log("Redir.. "+ATUAL.value);
		$('#menu').modal('hide');
		$location.path(location);
	}

	$scope.next = function (){
		if (ATUAL.key >= 0){
			for(var page in PAGES){
				if (PAGES[page] == ATUAL.key+1){
					$scope.redir(page);
					break;
				}
			}
		}
	}

	$scope.prev = function (){
		if (ATUAL.key >= 0){
			for(var page in PAGES){
				if (PAGES[page] == ATUAL.key-1){
					$scope.redir(page);
					break;
				}
			}
		}
	}
});
