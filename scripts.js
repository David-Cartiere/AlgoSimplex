

// Main program 
$(document).ready(function () {
	$("button").click(function () {


		getParametersBuildSelection()
		buildZVariables();
		

	});

	$("#findSimplex").click(function () {
		calculCj();
		minRatio();
		buildBaseTable();
		// main();
	});


});

// End Main Program !


function getParametersBuildSelection() {
	// alert("GenerateSaisie");

	$("#div_contraintes").empty();

	var nbVariables = $("#txtNbVariables").val();
	var nbContraintes = $("#txtNbContraintes").val();
	var i = 0;
	var j = 0;

	for (i = 0; i < nbContraintes; i++) {
		var txt0 = "";
		txt0 += "<p>Contraintes " + i + ":</p>";
		$("#div_contraintes").append(txt0);


		for (j = 0; j < nbVariables; j++) {
			var txt = "<input id='txtCj" + i + "_" + j + "' type='text' size='2'>";

			txt += "<label for='txtCj" + i + "_" + j + "'>x<sub>" + (j+1) + "</sub></label>";
			$("#div_contraintes").append(txt);
		}


		var txt1 = "";
		txt1 += "<select id='selection_comparateur" + i + "'>";
		txt1 += "<option id='comparateurInfEgale'><=</option>";
		txt1 += "<option id='comparateurSupEgale'>=></option>";
		txt1 += "<option id='comparateurEgale'>=</option>";
		txt1 += '</select>';
		txt1 += "<input type='text' id='valeur_contrainte_" + i + "'  size='2'>";

		$("#div_contraintes").append(txt1);
	}

	$(".hidden_content").addClass("visible_content");
	$(".visible_content").removeClass("hidden_content");

}

function buildZVariables() {

	$("#div_valeur_z").empty();

	var nbVariables = $("#txtNbVariables").val();

	for (j = 0; j < nbVariables; j++) {
		var create_z = "<input id='variable_z" + j + "' type='text' size='2'>";
		create_z += "<label for='variable_z" + j + "'>x<sub>" + (j+1) + "</sub></label>";
		$("#div_valeur_z").append(create_z);
	}
}

function main() {

	var nbVariables = $("#txtNbVariables").val();
	var nbContraintes = $("#txtNbContraintes").val();
	var i;
	var j;
	var tab_simplex = new Array();

	for (i = 0; i < nbContraintes; i++) {
		for (j = 0; j < nbVariables; j++) {
			console.log($("#txtCj" + i + "_" + j).val());
		}
	}


}


// critere 1 
function calculCj() {

	var nbVariables = $("#txtNbVariables").val();
	var nbContraintes = $("#txtNbContraintes").val();
	var tab_Cj = [];
	var i, j;
	var value_operateur;

	for (j = 0; j < nbVariables; j++) {
		tab_Cj.push($("#variable_z" + j + "").val());
	}

	for (i = 0; i < nbContraintes; i++) {
		if ($("#selection_comparateur" + i + " option:selected").text() == "<=") {
			tab_Cj.push("0");
		}
	}

	// ---------------- calcul du critère --------------------//
	var critere_1 = Math.max.apply(Math, tab_Cj); 
	var index_critere_1 = tab_Cj.indexOf(critere_1.toString());
	var variable_critere1 = "x" + (index_critere_1 + 1);
	console.log("Mot premier critère:" + critere_1);
	console.log("La variable du 1er critère:" + variable_critere1);
	// ------------ fin calcul du critère --------------------//
	return index_critere_1;
}

// calcul critere 2 

function minRatio(){

	//console.log("mon retour de fonction" + calculCj());

	var nbContraintes = $("#txtNbContraintes").val();
	var critere_1 = calculCj();
	var i;
	var ratio; 
	// var ratios = new Array();
	var ratios = [];
	var min; 

	//calculer 

	for (i = 0; i < nbContraintes; i++){

		ratios.push($("#valeur_contrainte_" + i).val() / $("#txtCj" + i + "_" + critere_1).val(), i);
	
	}

	

	// console.log(ratios);
	console.log(Math.min.apply(Math, ratios));
	// return Math.min.apply(Math, Math.min.apply(Math, ratios.slice(0))); 
	// console.log(ratios);

}

function buildBaseTable(){
	var nbContraintes = $("#txtNbContraintes").val();
	var nbVariables = $("#txtNbVariables").val();
	var base_table = new Array(); 
	var val_contrainte; 

	for (i = 0; i < nbContraintes; i++) {
		for (j = 0; j < nbVariables; j++) {

			// val_contrainte = $("#txtCj" + i + "_" + j).val();
			console.log($("#txtCj" + i + "_" + j).val());
			// base_table[i] = new Array();
			// base_table[j] = new Array(val_contrainte);
		
			
		}
	
	}

	
		
	
	

console.log(base_table);


}

