"use strict";
app.controller("index", function($scope, $rootScope, $location){
	$scope.app = basel.config;
	$scope.menus = basel.menu();

	var PAGES = {
		"/" : 0,
		"/inventario" : 1,
		"/depreciacoes" : 2,
		"/variacaoRebanho" : 3,
		"/custoFixo" : 4,
		"/custoVariavel" : 5,
		"/custoAdm" : 6,
		"/investimento" : 7,
		"/custoOperacional" : 8,
		"/custoOportunidade" : 9,
		"/custoTotal" : 10,
		"/receita" : 11,
		"/balanco" : 12,
		"/analise" : 13,
		"/fluxoCaixa" : 14,
		"/equilibrio" : 15
		};
	var ATUAL = { key : 0, value : "/"};

	$scope.menu = function (){
		$('#menu').modal('show');
	}

	$scope.redir = function(location){
		ATUAL.key = PAGES[location];
		ATUAL.value = location;

		console.log("Goto["+ATUAL.value+"]");
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
