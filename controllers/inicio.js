"use strict";
app.controller("inicio", function($scope, $rootScope, $location, $window, Propriedade){

	$scope.reserva = {
		"10%" : 0.1,
		"15%" : 0.15,
		"20%" : 0.2,
		"25%" : 0.25,
		"30%" : 0.3,
		"35%" : 0.35,
		"40%" : 0.4,
		"45%" : 0.45,
		"50%" : 0.5};
	$scope.uf = {
		"Acre" : "AC",
		"Alagoas" : "AL",
		"Amazonas" : "AM",
		"Amapá" : "AP",
		"Bahia" : "BA",
		"Ceará" : "CE",
		"Distrito Federal" : "DF",
		"Espírito Santo" : "ES",
		"Goiás" : "GO",
		"Maranhão" : "MA",
		"Mato Grosso" : "MT",
		"Mato Grosso do Sul" : "MS",
		"Minas Gerais" : "MG",
		"Pará" : "PA",
		"Paraíba" : "PB",
		"Paraná" : "PR",
		"Pernambuco" : "PE",
		"Piauí" : "PI",
		"Rio de Janeiro" : "RJ",
		"Rio Grande do Norte" : "RN",
		"Rio Grande do Sul" : "RS",
		"Rondônia" : "RO",
		"Roraima" : "RR",
		"Santa Catarina" : "SC",
		"São Paulo" : "SP",
		"Sergipe" : "SE",
		"Tocantins" : "TO",};

	//Lista as Propriedades
	$scope.initInicio = function(){
		$scope.atual = Propriedade.get();
		$scope.alerta = "";

		if ($scope.atual == null){
			basel.database.runAsync("SELECT * FROM propriedade", function(data){
				if(data[0] != null){
					$scope.propriedades = data;
					$('#selectModal').modal('show');
				}else{
					$scope.alerta = "Para o funcionamento do Sistema é necessário o cadastro de pelo menos uma Propriedade.";
					$('#selectModal').modal('hide');
					$('#cancelBtn').hide();
					$('#newModal').modal('show');
				}
			});
		}
	}

	$scope.setAtual = function(propriedade){
		Propriedade.set(propriedade);
		$scope.atual = propriedade;
	}

	$scope.hideSelect = function(){
		$('#selectModal').modal('hide');
	}

	//Salva no Banco
	$scope.save = function(){
		$scope.form.reserva = $scope.selectedReserva * $scope.form.area;
		$('#editModal').modal('hide');

		var id = $scope.form["id"];
		delete $scope.form["id"];
		delete $scope.form.$$hashKey;
		basel.database.update("propriedade", $scope.form, {id: id}); //entidade, dados, where

		$scope.form = {};
		$scope.initInicio();
	}

	$scope.new = function(){
		$scope.form.reserva = $scope.selectedReserva * $scope.form.area;
		$('#newModal').modal('hide');

		basel.database.insert("propriedade", $scope.form); // entidade, dados
		$scope.initInicio();
	}

	$scope.cancel = function(){
		$scope.form = {};
	}

	//Abrindo para editar
	$scope.edit = function(data){
		$scope.form = data;
		$('#editModal').modal('show');
	}

	//Excluindo
	$scope.delete = function(data){
		var Tables = [
			"propriedade",
			"balanco",
			"custo_adm",
			"custo_fixo",
			"custo_operacional",
			"custo_oportunidade",
			"custo_total",
			"custo_variavel",
			"depreciacoes",
			"equilibrio",
			"fluxo_caixa",
			"inventario",
			"investimento",
			"receita",
			"variacao_rebanho_area",
			"variacao_rebanho_qtd",
			"variacao_rebanho_peso"];

		if(confirm("Deseja realmente Deletar Propriedade?")){
			for(i in Tables){
				basel.database.delete(Tables[i], {id: data["id"]});
			}

			$scope.initInicio();
		}
	}
})
.factory('Propriedade', ['$window', function ( $window ) {
  var service = {};

  service.set = function(propriedade){
		$window.localStorage.setItem('propriedade', JSON.stringify(propriedade));
	};

	service.get = function(){
		return JSON.parse($window.localStorage.getItem("propriedade"));
	};

	service.getId = function(){
		return JSON.parse($window.localStorage.getItem("propriedade")).id;
	};

	service.clearPropriedade = function(){
		$window.localStorage.removeItem("idPropriedade");
	};

	return service;
}]);
