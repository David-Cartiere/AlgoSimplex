// Main program 
$(document).ready(function() {

    var n = get_n();
    var m = get_m();

    buildZVariables(n);
    buildGridVariables(n,m);

    $("#findSimplex").click(function() {
        main(); 
     });

    $("#validate_param").click(function() {

        var n = get_n();
        var m = get_m();

        buildZVariables(n);
        buildGridVariables(n,m); 
       
    });
});

function main(){
            var n = get_n();
            var m = get_m();

            var gridTab = generateGridTab(n,m);
            var cjTab = generateCjTab(n,m);
            var qTab = generateQTab(m);


            var cpTab = generateCpTab(m);
            var outpoutVariablesTab = generateOutputVariables(n, m);
            var gridTab = addOutputVariables(gridTab, n, m, outpoutVariablesTab);


            var cpXjTab = generateCpXjTab(cpTab, gridTab,n,m);
            var cjZjTab = generateCjZjTab(cjTab, cpXjTab, m,n);
            z = calculZ(cpTab, qTab, m);
            console.log(z);

            // console.log(gridTab);
            // console.log(cjTab);
            // console.log(qTab);
            // console.log(cpXjTab);
            // console.log(cjZjTab);

        

            $("#resultat").append("<h3>Résultat</h3>");
            $("#resultat").append("<h4 id='iteration'> Iteration 0</h4>");
            $("#resultat").append("<p id='z_resultat'><span class='badge badge-primary badge-pill'> Z = " + z +"</span></p>");

            var i =1;
            while(verifyValuesOfCpCz(cjZjTab, n, m)){

                var index_of_first_critere = findFirstCritere(cjZjTab);
                var index_of_second_critere = findSecondCritere(qTab, gridTab, index_of_first_critere, m);
                var valueOfPivot = getPivotValue(gridTab, index_of_first_critere, index_of_second_critere);
                var cpTab = updateCpTab(cpTab, cjTab, index_of_first_critere, index_of_second_critere, valueOfPivot);
                var qTab = updateQtabAfterPivot(qTab, gridTab, index_of_second_critere, index_of_first_critere, valueOfPivot, m,n);
                var gridTab = updateGridTabAfterPivot(gridTab, index_of_second_critere, index_of_first_critere, valueOfPivot, m,n);
                var cpXjTab = generateCpXjTab(cpTab, gridTab,n,m);
                var cjZjTab = generateCjZjTab(cjTab, cpXjTab, m,n); 

                z = calculZ(cpTab, qTab, m);
                console.log(z);
                console.log(index_of_first_critere);
                console.log(index_of_second_critere);
                console.log(valueOfPivot);
                

                printResult(i, valueOfPivot, z);
                if(i == 4){
                    break;
                }
                i++;
        }      
}

//---------------- FONCTIONS POUR LA GENERATION DE HTML ----------------------------- // 

// 1) Créer le formulaire pour saisir le Z = 
// n = nombre de variables 
function buildZVariables(n) {

    $("#formulaire_z").empty();
    $("#resultat").empty();

    $("#formulaire_z").append("<select id='selection_z' class='custom-select'><option>Max</option><option>Min</option></select>");

    for (var i = 0; i < n; i++){
        var create_z = " <input class='form-control' id='variable_z" + i + "' type='text' size='2'>";
        if(i == n-1){
            create_z += "<label for='variable_z" + i + "'>x<sub>" + (i + 1) + "</sub></label>";
        }
        else{
            create_z += "<label for='variable_z" + i + "'>x<sub>" + (i + 1) + " + </sub></label>";
        }
        
        $("#formulaire_z").append(create_z);
    }
    
}

// 2) Créer le formulaire de saisie des contraintes 
function buildGridVariables(n,m) {

    $("#contraintes_form").empty();
  

    for (var i = 0; i < m; i++) {

        $("#contraintes_form").append("<form class='form-inline form_contraintes' id='form_row_" + i +"'>");
       
            for (var j = 0; j < n; j++) {
                
                    var txt = "<input class='form-control' id='txtCj" + i + "_" + j + "' type='text' size='2'>";
                    if(j == n-1){
                        txt += "<label for='txtCj" + i + "_" + j + "'>x<sub>" + (j + 1) + "</sub></label>";
                    }else{
                        txt += "<label for='txtCj" + i + "_" + j + "'>x<sub>" + (j + 1) + " + </sub></label>";
                    }
                        $("#form_row_" + i +"").append(txt);
                  
            }
   
            var txt1 = "";
            txt1 += "<select class='form-control' id='selection_comparateur" + i + "'>";
            txt1 += "<option id='comparateurInfEgale'><=</option>";
            txt1 += "<option id='comparateurSupEgale'>=></option>";
            txt1 += "<option id='comparateurEgale'>=</option>";
            txt1 += '</select>';
            txt1 += "<input class='form-control' type='text' id='valeur_contrainte_" + i + "'  size='2'></<input>";

            $("#form_row_" + i +"").append(txt1);
            $("contraintes_form").append("</form>");
        }
    $(".hidden_content").addClass("visible_content");
    $(".visible_content").removeClass("hidden_content");
}

//---------------- FONCTIONS POUR LE TRAITEMENT         ----------------------------- // 
// 1) Récupère le nombre de variables
function get_n(){
    return parseInt($("#txtn").val());
}

// 2) Récupère le nombre de m 
function get_m(){
    return parseInt($("#txtm").val());
}


//---------------- FONCTIONS POUR BUILD LES TABLES DE BASES ------------------------ //
// 1) création de la grille centrale 
function generateGridTab(n,m){
    
    var variable_entrante = "#txtCj";
    var gridTab = new Array();

    for(var i = 0; i< m; i++){
        gridTab[i] = new Array(n);
        for(var j = 0; j< n; j++){
            gridTab[i][j] = parseInt($(variable_entrante + i + "_" + j).val());
        }
    }
    return gridTab;
}

// 2) création de la table Z
function generateCjTab(n,m){

    var variable_z = "#variable_z";
    var cjTab = new Array();
    var nb_colonne = parseInt(n) + parseInt(m);

    for(var i =0; i < nb_colonne; i++){
        cjTab[i] = parseInt($(variable_z + i).val());
    }
    for(var i =0; i < nb_colonne; i++){
        if(isNaN(cjTab[i])){
            cjTab[i] = 0;
        };
    }
    return cjTab;
}

// 3) création de la table Q
function generateQTab(m){

    var variable_contrainte = "#valeur_contrainte_";
    var qTab = [];

    for(var i =0; i < m; i++){
        qTab[i] = parseInt($(variable_contrainte + i).val());
    }
    return qTab;
}


// 3-1) Création du tableau cpCz
function generateCpXjTab(cpTab, gridTab,n,m){

    var nb_colonne = parseInt(n) + parseInt(m);
    var j = 0;
    var resultat = 0;
    var cpXjTab = new Array();
    while(j <nb_colonne){
        resultat = 0;
        for(var i =0; i< m; i++){
             resultat = resultat + (cpTab[i] * gridTab[i][j]);
        }
        cpXjTab.push(resultat);
        j++;  
    }
    return cpXjTab;
}

//4) Création du tableau Cp 
function generateCpTab(m){
    var cpTab = [];
    for(var i = 0; i<m; i++)
        cpTab[i] = 0;
    return cpTab;
} 

// 5) Ajout des variables sortantes 
function addOutputVariables(gridTab, n, m, outpoutVariablesTab){
        for(var i = 0; i < m; i++){
            for(var j = 0; j<m; j++){
                gridTab[i].push(outpoutVariablesTab[i][j]);
            }
        }
    return gridTab;      
}

// 6) Tableau générant les variables sortantes 
function generateOutputVariables(n,m){

    var outputVariables = [];

    for(var i = 0; i < m; i++){
        outputVariables[i] = new Array(n)
        for(var j = 0; j < n; j++){
            outputVariables[i][i] = 1;
        }
    }
    
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < m; j++) {
            if (outputVariables[i][j] != 1) {
                outputVariables[i][j] = 0;
            }
        }
    }    
    return outputVariables;
}

// 7) Trouve le critère 1 
// Retourne l'index / colonne 
function findFirstCritere(cjZjTab){

    var val_of_max_value =  Math.max.apply(Math, cjZjTab); // la valeur max
    var index_of_first_critere = (cjZjTab.indexOf(val_of_max_value)); // l'index de la valeur max 

    return index_of_first_critere;
}

// 8 ) Trouve le critere 2 
// Retourne l'index / ligne 
function findSecondCritere(qTab, gridTab, index_of_first_critere, m){
   
   
        var min = qTab[0] / gridTab[0][index_of_first_critere];
        if(min < 0){
            min = qTab[1] / gridTab[1][index_of_first_critere];
        }
    
    var temp = new Array();
    var index_of_second_critere = 0;

    for(var i= 0; i<m; i++){
        temp[i] = qTab[i] / gridTab[i][index_of_first_critere];
    }
   

    for(var i =0; i<m; i++){
      
        if(temp[i] > 0){
            if(temp[i] <= min){
            min = temp[i];
        }
    }
       
    }

    index_of_second_critere = temp.indexOf(min);

   
    return index_of_second_critere;
}

// 9) Retourne la valeur pivot 
function getPivotValue(gridTab, index_of_first_critere, index_of_second_critere ){
    return gridTab[index_of_second_critere][index_of_first_critere];
}

// 10) Mettre à jour le tableau Cp 
function updateCpTab(cpTab, cjTab, index_of_first_critere, index_of_second_critere, valueOfPivot){
    cpTab[index_of_second_critere] = cjTab[index_of_first_critere];

    return cpTab;
}

// 11) Creation du tableau Cj - Zj 
function generateCjZjTab(cjTab, cpXjTab, m, n){
   
    var nb_colonne =  parseInt(n) + parseInt(m);
    var cjZjTab = new Array();

    for(var i =0; i<nb_colonne; i++){
       if (cjTab[i] - cpXjTab[i]){
        cjZjTab.push(cjTab[i] - cpXjTab[i]);
       } else{
        cjZjTab.push(0);
       }
       
    }
    return cjZjTab;
}

// 12) Vérifier si valeur supérieur à 0 dans cjZjTab
function verifyValuesOfCpCz(cjZjTab, n, m){

    var nb_colonne =  parseInt(n) + parseInt(m);
    
    for(var i =0; i<nb_colonne; i++){
        if(cjZjTab[i] > 0){
            return true; 
        }
      }
    return false;
}

function updateGridTabAfterPivot(gridTab, index_of_second_critere, index_of_first_critere,valueOfPivot, m,n){
   
    var nb_colonne =  parseInt(n) + parseInt(m);

    for(var i = 0; i < m; i++){
        for(var j =0; j<nb_colonne; j++){
            if(i == index_of_second_critere){
              
                gridTab[i][j] = gridTab[i][j] / valueOfPivot;
            }
         }   
     }
 
     for(var i = 0; i < m; i++){
        var valeur_pivot_line = gridTab[i][index_of_first_critere];
        for(var j=0; j<nb_colonne;j++){
            if (i !== index_of_second_critere){
                gridTab[i][j] =  gridTab[i][j] - (valeur_pivot_line * gridTab[index_of_second_critere][j]);
     }
    }
}
     return gridTab;
 }

function updateQtabAfterPivot(qTab, gridTab, index_of_second_critere, index_of_first_critere,valueOfPivot, m,n){

    var nb_colonne =  parseInt(n) + parseInt(m);
  
    for(var i = 0; i < m; i++){
        var valeur_pivot_line = gridTab[i][index_of_first_critere];
         if(i == index_of_second_critere){
             qTab[i] = qTab[i] / valueOfPivot;
         }
     }
 
     for(var i = 0; i < m; i++){
         var valeur_pivot_line = qTab[i][index_of_first_critere];
         if (i !== index_of_second_critere){
             qTab[i] = qTab[i] + (-1 * (gridTab[i][index_of_first_critere] * qTab[index_of_second_critere]));
         }
     }
     return qTab;
 }

// 14) Calcul de Z, enfin ! 
function calculZ(cpTab, qTab, m){
    var z = 0;
    for(var i =0; i<m; i++){
        z = z +  (cpTab[i] * qTab[i]);
    }
return z;
}

// 15) Afficher le résultat 
function printResult(i, valueOfPivot, z){
    $("#resultat").append("<h4 id='iteration'> Iteration " + i +"</h4>");
    $("#resultat").append("<p id='valeur pivot'> Valeur pivot: " + valueOfPivot +"</p>");
    $("#resultat").append("<p id='z_resultat'><span class='badge badge-primary badge-pill'> Z = " + z +"</span></p>");
}

/* ---------- FONCTIONS CONCERNANT LA MINIMISATION --------- */ 

function getSignOfContrainte(m){
    for(var i=0; i<m; i++){
        if($("#selection_comparateur" + i).value() == "<="){
            for(var i =0; i < nb_colonne; i++){
                cjTab[i].push(1);
            }
        }
        if($("#selection_comparateur" + i).value() == "=>"){
            cjTab[i].push(-1);
        }
    }
}

function count_n_m(cpTab){
    return cpTab.length - m;
}

function generateNormalForm(){


}

function updateZ(){

}

function verifyValuesOfVariables(){

}

function generateDimension(){
    updateZ();
}













