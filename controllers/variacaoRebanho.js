"use strict";
app.controller("variacaoRebanho", function($scope, $location, $window, Propriedade){

	var PESO_BD = [];
	var QTD_BD = [];
	var AREA_BD = [];
	var DESC_ANIMAL = [
		"Matrizes",
		"Novilhos[+14]@",
		"Novilhos[12-14]@",
		"Novilhos[1-12]@",
		"Novilhas[1-12]@",
		"Bezerros",
		"Bezerras",
		"Outros",
		"Equideos"];

	$scope.initRebanhoPeso = function(){
		var SQL = "SELECT * FROM variacao_rebanho_peso WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				PESO_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("PesoRebanho[OK]");
			$scope.initRebanhoQtd();
		}else{
			console.log("PesoRebanho[ERRO]");
			$scope.createRebanhoPeso();
		}
	}

	$scope.initRebanhoQtd = function(){
		var SQL = "SELECT * FROM variacao_rebanho_qtd WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				QTD_BD = data;
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("QtdRebanho[OK]");
			$scope.initRebanhoArea();
		}else{
			console.log("QtdRebanho[ERRO]");
			$scope.createRebanhoQtd();
		}
	}

	$scope.initRebanhoArea = function(){
		var SQL = "SELECT * FROM variacao_rebanho_area WHERE propriedadeId_FK="+Propriedade.getId();
		var res = false;

		basel.database.runAsync(SQL, function(data){
			if(data[0] != null){
				AREA_BD = data[0];
				res = true;
			}else{
				res = false;
			}
		});

		if(res){
			console.log("AreaRebanho[OK]");
			$scope.tratarRebanho();
		}else{
			console.log("AreaRebanho[ERRO]");
			$scope.createRebanhoArea();
		}
	}

	$scope.tratarRebanho = function(){
		var TOTAL_CABECAS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		var PESO_MEDIO_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		var ESTOQUE_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		var DENSIDADE_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		var LOTACAO_MES = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

		for(i in PESO_BD){
			TOTAL_CABECAS[0] += QTD_BD[i].jan;
			PESO_MEDIO_MES[0] += QTD_BD[i].jan * PESO_BD[i].jan;

			TOTAL_CABECAS[1] += QTD_BD[i].fev;
			PESO_MEDIO_MES[1] += QTD_BD[i].fev * PESO_BD[i].fev;

			TOTAL_CABECAS[2] += QTD_BD[i].mar;
			PESO_MEDIO_MES[2] += QTD_BD[i].mar * PESO_BD[i].mar;

			TOTAL_CABECAS[3] += QTD_BD[i].abr;
			PESO_MEDIO_MES[3] += QTD_BD[i].abr * PESO_BD[i].abr;

			TOTAL_CABECAS[4] += QTD_BD[i].mai;
			PESO_MEDIO_MES[4] += QTD_BD[i].mai * PESO_BD[i].mai;

			TOTAL_CABECAS[5] += QTD_BD[i].jun;
			PESO_MEDIO_MES[5] += QTD_BD[i].jun * PESO_BD[i].jun;

			TOTAL_CABECAS[6] += QTD_BD[i].jul;
			PESO_MEDIO_MES[6] += QTD_BD[i].jul * PESO_BD[i].jul;

			TOTAL_CABECAS[7] += QTD_BD[i].ago;
			PESO_MEDIO_MES[7] += QTD_BD[i].ago * PESO_BD[i].ago;

			TOTAL_CABECAS[8] += QTD_BD[i].sem;
			PESO_MEDIO_MES[8] += QTD_BD[i].sem * PESO_BD[i].sem;

			TOTAL_CABECAS[9] += QTD_BD[i].out;
			PESO_MEDIO_MES[9] += QTD_BD[i].out * PESO_BD[i].out;

			TOTAL_CABECAS[10] += QTD_BD[i].nov;
			PESO_MEDIO_MES[10] += QTD_BD[i].nov * PESO_BD[i].nov;

			TOTAL_CABECAS[11] += QTD_BD[i].dez;
			PESO_MEDIO_MES[11] += QTD_BD[i].dez * PESO_BD[i].dez;
		}

		for(i=0; i<12; i++){
			PESO_MEDIO_MES[i] /= TOTAL_CABECAS[i];
			ESTOQUE_MES[i] = (PESO_MEDIO_MES[i] * TOTAL_CABECAS[i]) / 30;
			DENSIDADE_MES[i] = TOTAL_CABECAS[i] / $scope.getArea(i);
			LOTACAO_MES[i] = ((TOTAL_CABECAS[i] * PESO_MEDIO_MES[i]) / 450) / $scope.getArea(i);
		}

		$scope.total_cabecas = TOTAL_CABECAS;
		$scope.peso_medio_mes = PESO_MEDIO_MES;
		$scope.estoque_mes = ESTOQUE_MES;
		$scope.densidade_mes = DENSIDADE_MES;
		$scope.lotacao_mes = LOTACAO_MES;
		$scope.area_util_mes = AREA_BD;
		$scope.variacao_rebanho_peso = PESO_BD;
		$scope.variacao_rebanho_qtd = QTD_BD;

		$scope.repeatData = QTD_BD.map(function(value, index) {
		    return {
	        qtd: value,
	        peso: PESO_BD[index]
		    }
		});
	}

	/* Cria Tabela do Rebanho */
	$scope.createRebanhoPeso = function(){
		for(i in DESC_ANIMAL){
			$scope.form = {};
			$scope.form.descricao = DESC_ANIMAL[i];
			$scope.form.propriedadeId_FK = Propriedade.getId();
			$scope.form.jan = 0;
			$scope.form.fev = 0;
			$scope.form.mar = 0;
			$scope.form.abr = 0;
			$scope.form.mai = 0;
			$scope.form.jun = 0;
			$scope.form.jul = 0;
			$scope.form.ago = 0;
			$scope.form.sem = 0;
			$scope.form.out = 0;
			$scope.form.nov = 0;
			$scope.form.dez = 0;
			$scope.newPeso();
		}

		$scope.initRebanhoPeso();
	}

	$scope.createRebanhoQtd = function(){
		for(i in DESC_ANIMAL){
			$scope.form = {};
			$scope.form.descricao = DESC_ANIMAL[i];
			$scope.form.propriedadeId_FK = Propriedade.getId();
			$scope.form.jan = 0;
			$scope.form.fev = 0;
			$scope.form.mar = 0;
			$scope.form.abr = 0;
			$scope.form.mai = 0;
			$scope.form.jun = 0;
			$scope.form.jul = 0;
			$scope.form.ago = 0;
			$scope.form.sem = 0;
			$scope.form.out = 0;
			$scope.form.nov = 0;
			$scope.form.dez = 0;
			$scope.newQtd();
		}

		$scope.initRebanhoQtd();
	}

	$scope.createRebanhoArea = function(){
		$scope.form = {};
		$scope.form.propriedadeId_FK = Propriedade.getId();
		$scope.form.jan = 1;
		$scope.form.fev = 1;
		$scope.form.mar = 1;
		$scope.form.abr = 1;
		$scope.form.mai = 1;
		$scope.form.jun = 1;
		$scope.form.jul = 1;
		$scope.form.ago = 1;
		$scope.form.sem = 1;
		$scope.form.out = 1;
		$scope.form.nov = 1;
		$scope.form.dez = 1;
		$scope.newArea();

		$('#infoModal').modal('show');
		$scope.initRebanhoArea();
	}

	/* */
	$scope.getArea = function(index){
		switch(index){
			case 0:
				return AREA_BD.jan;
			case 1:
				return AREA_BD.fev;
			case 2:
				return AREA_BD.mar;
			case 3:
				return AREA_BD.abr;
			case 4:
				return AREA_BD.mai;
			case 5:
				return AREA_BD.jun;
			case 6:
				return AREA_BD.jul;
			case 7:
				return AREA_BD.ago;
			case 8:
				return AREA_BD.sem;
			case 9:
				return AREA_BD.out;
			case 10:
				return AREA_BD.nov;
			case 11:
				return AREA_BD.dez;
			default:
				return 0;
		}
	}

	/* Salvando no Banco */
	$scope.savePeso = function(){
		var id = $scope.form["id"];
		$('#pesoModal').modal('hide');
		delete $scope.form["id"];
		delete $scope.form.$$hashKey;

		basel.database.update("variacao_rebanho_peso", $scope.form, {id: id});

		$scope.initRebanhoPeso();
	}

	$scope.saveQtd = function(){
		var id = $scope.form["id"];
		$('#qtdModal').modal('hide');
		delete $scope.form["id"];
		delete $scope.form.$$hashKey;

		basel.database.update("variacao_rebanho_qtd", $scope.form, {id: id});

		$scope.initRebanhoQtd();
	}

	$scope.saveArea = function(){
		var id = $scope.form["id"];
		$('#areaModal').modal('hide');
		delete $scope.form["id"];
		delete $scope.form.$$hashKey;

		basel.database.update("variacao_rebanho_area", $scope.form, {id: id});

		$scope.initRebanhoArea();
	}

	/* Inserindo no Banco */
	$scope.newPeso = function(){
		basel.database.insert("variacao_rebanho_peso", $scope.form); // entidade, dados
		$scope.form = {};
	}

	$scope.newQtd = function(){
		basel.database.insert("variacao_rebanho_qtd", $scope.form); // entidade, dados
		$scope.form = {};
	}

	$scope.newArea = function(){
		basel.database.insert("variacao_rebanho_area", $scope.form); // entidade, dados
		$scope.form = {};
	}

	/* */
	$scope.editPeso = function(data){
		$scope.form = data;
		$('#pesoModal').modal('show');
	}

	$scope.editQtd = function(data){
		$scope.form = data;
		$('#qtdModal').modal('show');
	}

	$scope.editArea = function(data){
		$scope.form = data;
		$('#areaModal').modal('show');
	}

	$scope.cancel = function(){
		$scope.form = {};
	}

	$scope.delete = function(data){
		if(confirm("Resetar Variação de Rebanho?")){
			basel.database.delete("variacao_rebanho_qtd", {propriedadeId_FK : Propriedade.getId()});
			basel.database.delete("variacao_rebanho_peso", {propriedadeId_FK : Propriedade.getId()});
			basel.database.delete("variacao_rebanho_area", {propriedadeId_FK : Propriedade.getId()});
		}
		$location.path('/');
	}
});
