

// Main program 
$(document).ready(function () {
	$("button").click(function () {


		getParametersBuildSelection()
		buildZVariables();

	});

	$("#findSimplex").click(function () {
		calculCj();
		main();
	});


});

// End Main Program 


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


		for (j = 1; j < nbVariables; j++) {
			var txt = "<input id='txtCj" + i + "_" + j + "' type='text' size='2'>";

			txt += "<label for='txtCj" + i + "_" + j + "'>x<sub>" + j + "</sub></label>";
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
	var tab_simplex;

	for (i = 0; i < nbContraintes; i++) {
		for (j = 0; j < nbVariables; j++) {
			console.log($("#txtCj" + i + "_" + j).val());
		}
	}


}


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
	var variable_critere1 = "x" + index_critere_1;
	console.log("Mot premier critère:" + critere_1);
	console.log("La variable du 1er critère:" + variable_critere1);
	// ------------ fin calcul du critère --------------------//



	

	

}

