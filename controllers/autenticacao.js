"use strict";
app.controller("autenticacao", function($scope, $rootScope, $location, $window){

	// Procura a Chave no Banco
	$scope.initAutenticar = function(){
		basel.database.runAsync("SELECT * FROM autenticacao", function(data){
			if(data[0] != null){
        $window.localStorage.setItem('chave', data[0].chave);
				$location.path("/");
			}else{
				$('#avisoModal').modal('show');
			}
		});
	}

	$scope.new = function(){
		basel.database.insert("autenticacao", $scope.form);
		$scope.initAutenticar();
	}
});
