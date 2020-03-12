// Main program 
$(document).ready(function() {


    $("#findSimplex").click(function() {
        calculCj();
        minRatio();
		buildBaseTable();
        // main();
    });


});

// ---- fonction qui appelle les fonctions après la validation du nombre de contraintes et de variables 
function checkscript() {

    getParametersBuildSelection();
	buildZVariables();
	
}

// End Main Program !



// ---- récupére les valeurs 
//Créer le formulaire de saisie des contraintes 
function getParametersBuildSelection() {

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

            txt += "<label for='txtCj" + i + "_" + j + "'>x<sub>" + (j + 1) + "</sub></label>";
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

//---- Créer le formulaire pour saisir le Z = 
function buildZVariables() {

    $("#div_valeur_z").empty();

    var nbVariables = $("#txtNbVariables").val();

    for (j = 0; j < nbVariables; j++) {
        var create_z = "<input id='variable_z" + j + "' type='text' size='2'>";
        create_z += "<label for='variable_z" + j + "'>x<sub>" + (j + 1) + "</sub></label>";
        $("#div_valeur_z").append(create_z);
    }
}

// function main() {

// 	var nbVariables = $("#txtNbVariables").val();
// 	var nbContraintes = $("#txtNbContraintes").val();
// 	var i;
// 	var j;
// 	var tab_simplex = new Array();

// 	for (i = 0; i < nbContraintes; i++) {
// 		for (j = 0; j < nbVariables; j++) {
// 			console.log($("#txtCj" + i + "_" + j).val());
// 		}
// 	}


// }


// ---- Calcule du critere 1 
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


// ---- calcul critere 2 
function minRatio() {

    //console.log("mon retour de fonction" + calculCj());

    var nbContraintes = $("#txtNbContraintes").val();
    var critere_1 = calculCj();
    var i;
    var ratio;
    var ratios = [];
    var min;

    //calculer 

    for (i = 0; i < nbContraintes; i++) {

        ratios.push($("#valeur_contrainte_" + i).val() / $("#txtCj" + i + "_" + critere_1).val(), i);

    }
    console.log(Math.min.apply(Math, ratios));
}

// --- Construire tableau de matrice

function buildBaseTable() {
	var nbVariables = parseInt($("#txtNbVariables").val());
	var nbContraintes = parseInt($("#txtNbContraintes").val());
	var nbVariablesAjoutees = countInfSign();
	var nbColonnes = nbVariablesAjoutees + nbVariables;
	var nbLignes = nbContraintes;
	var ii = nbVariables;

	alert(nbColonnes);

	
	// on cree le tableau bleu, contenant les lignes
	var grille = new Array();
	
	// on cree les lignes (tableau vert) les unes après les autres
	for(var i=0; i<nbLignes; i++)
	   grille[i] = new Array(nbColonnes);
	
	// on parcourt les lignes...
	for(var i=0; i<nbLignes; i++)
	   // ... et dans chaque ligne, on parcourt les cellules
	   for(var j=0; j<nbColonnes; j++)
			grille[i][j] = $("#txtCj" + i + "_" + j).val();
	   
	
	//ajout de la variables xf1 xf2 xf3 etc ... 
	for(var i=0; i<nbLignes; i++){
		//ajouter variable si signe inférieur pour mettre sous forme linéaire
		if ($("#selection_comparateur" + i + " option:selected").text() == "<=") { 
			grille[i][ii] = "1"; 
		} else {
			grille[i][ii] = "0"; 
		}
		ii++;
	}


	//ajout du 0 pour les variables n'ayant pas de valeur (coefficient)
	for(var i=0; i<nbLignes; i++) {
	   for(var j=0; j<nbColonnes; j++){
		if(grille[i][j] === undefined){
			grille[i][j] = "0";
		}
		}
		}



	//mettre ma condition pour signe sup ICI ;) 
	// finirDeRemplirTableauAvecZero(grille);
	console.log(grille);
	
}

// compte le nombre de signe inférieur =< 
function countInfSign(){

	var nbContraintes = parseInt($("#txtNbContraintes").val());
	nb_inegalite_inf = 0;

	for (i = 0; i < nbContraintes; i++) {
        if ($("#selection_comparateur" + i + " option:selected").text() == "<=") {
			nb_inegalite_inf++;
        }
	}
	return nb_inegalite_inf;
}

function finirDeRemplirTableauAvecZero(grille){

	var nbVariables = parseInt($("#txtNbVariables").val());
	var nbContraintes = parseInt($("#txtNbContraintes").val());
	var nbVariablesAjoutees = countInfSign();
	var nbColonnes = nbVariablesAjoutees + nbVariables;
	var nbLignes = nbContraintes;
	var ii = nbVariables;
	console.log(grille);

	for(var i=0; i<nbLignes; i++)
  		 for(var j=0; j<nbColonnes; j++)
			if (grille[i][j] == ""){
				grille[i][j] = 0;
			}
			
  


}



