"use strict";
app.controller("inventario", function($scope, $location, Propriedade){

	var INVENTARIO_BANCO = [];
	var CAPITAL_TOTAL = 0;

	/* INICIA O INVENTARIO */
	$scope.initInventario = function(){

		var SQL = "SELECT * FROM inventario WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				INVENTARIO_BANCO = data;
				//console.log(INVENTARIO_BANCO);
				res = true;
			}else{
				res = false;
			}
		});


		if(res){
			console.log("Inventario[OK]");
			$scope.tratarInventario();
		}else{
			console.log("Inventario[ERRO]");
			$scope.createInventario();
		}
	}

	$scope.createInventario = function(){
		$('#infoModal').modal('show');
		
		var lista = ["Insumos", "Maquinas e Implementos", "Tratores", "Veiculos", "Equipamentos Manuais",
		 "Reprodutores Machos", "Reprodutores Femeas", "Animais de Engorda", "Animais de Trabalho",
		 "Canavial ou Volumosos", "Benfeitorias", "Cercas", "Edificacoes", "Pastagem", "Semem", "Terra"];

		for(i in lista) {
			$scope.form = {}
			$scope.form.descricao = lista[i];
			$scope.form.valor_inicial = 0.0;
			$scope.form.valor_final = 0.0;
			$scope.form.propriedadeId_FK = Propriedade.getId();

			$scope.new();
		}

		$scope.initInventario();
	}

	$scope.tratarInventario = function(){
		$scope.getCapitalTotal();

		for(i in INVENTARIO_BANCO){
			INVENTARIO_BANCO[i].medio = (INVENTARIO_BANCO[i].valor_final + INVENTARIO_BANCO[i].valor_inicial) /2;
			if(CAPITAL_TOTAL == 0 || INVENTARIO_BANCO[i].medio == 0){
				INVENTARIO_BANCO[i].percent = 0;
			}else{
				INVENTARIO_BANCO[i].percent = (INVENTARIO_BANCO[i].medio*100) / CAPITAL_TOTAL;
			}
		}

		$scope.inventario = INVENTARIO_BANCO;
	}

	$scope.getCapitalTotal = function(){
		for(i in INVENTARIO_BANCO){
			CAPITAL_TOTAL += (INVENTARIO_BANCO[i].valor_final + INVENTARIO_BANCO[i].valor_inicial) /2;
			//console.log(CAPITAL_TOTAL);
		}
	}

	//Saving
	$scope.save = function(){
		$scope.form.propriedadeId_FK = Propriedade.getId();
		var id = $scope.form["id"];
		delete $scope.form["id"];
		delete $scope.form.$$hashKey; //Apaga elemento $$hashKey do objeto
		basel.database.update("inventario", $scope.form, {id: id}); //entidade, dados, where

		$scope.initInventario();
	}

	$scope.new = function(){
		basel.database.insert("inventario", $scope.form);
	}

	// Cancel form
	$scope.cancel = function(){
		$scope.form = {};
	}

	//Abrindo para editar
	$scope.edit = function(item){
		$scope.form = {}
		$scope.form.id = item.id;
		$scope.form.descricao = item.descricao;
		$scope.form.valor_final = item.valor_final;
		$scope.form.valor_inicial = item.valor_inicial;
	}

	//Excluindo
	$scope.delete = function(){
		if(confirm("Resetar Inventario?")){
			basel.database.delete("inventario", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});
