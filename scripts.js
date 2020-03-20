// Main program 
$(document).ready(function() {

    var n = get_n();
    var m = get_m();

    buildZVariables(n);
    buildGridVariables(n,m);

    $("#findSimplex").click(function() {

        var n = get_n();
        var m = get_m();

        var cpTab = generateCpTab(m);
        // var gridTab = generateGridTab(n,m);
        // var cjTab = generateCjTab(n,m);
        // var qTab = generateQTab(m);
        
       
        var qTab = ["18","42","24"];
        var gridTab = [
            ["2","1"],
            ["2","3"],
            ["3","1"],
        ];
        var cjTab = ["3","2","0","0","0"];

        // console.log("cp",cpTab);
        // console.log("gridTab",gridTab);
        // console.log("cjTab",cjTab);
      

        
        var outpoutVariablesTab = generateOutputVariables(n, m);
       
        var gridTab = addOutputVariables(gridTab, n, m, outpoutVariablesTab);
        var index_of_first_critere = findFirstCritere(cjTab);
        var index_of_second_critere = findSecondCritere(qTab, gridTab, index_of_first_critere, m);
        var valueOfPivot = getPivotValue(gridTab, index_of_first_critere, index_of_second_critere );
        var cpXjTab = generateCpXjTab(cpTab, gridTab,n,m);
        cpTab = updateCpTab(cpTab, index_of_second_critere, valueOfPivot);
        /* Changer les valeurs des lignes ici --> Faire la fonction) */
        generateCpXjTab(cpTab, gridTab,n,m);
        var cpZjTab = generateCpZjTab(cjTab, cpXjTab, m,n);

        if(verifyValuesOfCpCz(cpZjTab,n,m)){
           
        }else{
            
        }

       var tabTest = majAlltabs(gridTab, index_of_second_critere, index_of_first_critere, valueOfPivot, m,n);
        // // gridTab = majOthersLines(gridTab, index_of_second_critere, index_of_first_critere,valueOfPivot, m,n);
        console.log("gridTab",gridTab);
        console.log("Tab test : ", tabTest);

       

      
       
       
        
        
        
     });

    $("#validate_param").click(function() {

        var n = get_n();
        var m = get_m();

        buildZVariables(n);
        buildGridVariables(n,m); 
       
    });
});

//---------------- FONCTIONS POUR LA GENERATION DE HTML ----------------------------- // 

// 1) Créer le formulaire pour saisir le Z = 
// n = nombre de variables 
function buildZVariables(n) {

    $("#div_valeur_z").empty();

    for (var i = 0; i < n; i++){
        var create_z = "<input id='variable_z" + i + "' type='text' size='2'>";
        create_z += "<label for='variable_z" + i + "'>x<sub>" + (i + 1) + "</sub></label>";
        $("#div_valeur_z").append(create_z);
    }
    
}

// 2) Créer le formulaire de saisie des contraintes 
function buildGridVariables(n,m) {

    $("#div_contraintes").empty();

    for (var i = 0; i < m; i++) {
            var txt0 = "";
            txt0 += "<p>Contraintes " + i + ":</p>";
            $("#div_contraintes").append(txt0);

            for (var j = 0; j < n; j++) {
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




//---------------- FONCTIONS POUR LE TRAITEMENT         ----------------------------- // 
// 1) Récupère le nombre de variables
function get_n(){
    return $("#txtn").val();
}

// 2) Récupère le nombre de m 
function get_m(){
    return $("#txtm").val();
}


//---------------- FONCTIONS POUR BUILD LES TABLES DE BASES ------------------------ //
// 1) création de la grille centrale 
function generateGridTab(n,m){
    
    var variable_entrante = "#txtCj";
    var gridTab = new Array();

    for(var i = 0; i< m; i++){
        gridTab[i] = new Array(n);
        for(var j = 0; j< n; j++){
            gridTab[i][j] = $(variable_entrante + i + "_" + j).val();
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
        cjTab[i] = $(variable_z + i).val();
    }
    for(var i =0; i < nb_colonne; i++){
        if( cjTab[i] === undefined){
            cjTab[i] = "0";
        };
    }
    return cjTab;
}

// 3) création de la table Q
function generateQTab(m){

    var variable_contrainte = "#valeur_contrainte_";
    var qTab = [];

    for(var i =0; i < m; i++){
        qTab[i] = $(variable_contrainte + i).val();
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
        cpTab[i] = "0";
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
            outputVariables[i][i] = '1';
        }
    }
    
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < m; j++) {
            if (outputVariables[i][j] != '1') {
                outputVariables[i][j] = "0";
            }
        }
    }    
    return outputVariables
}

// 7) Trouve le critère 1 
// Retourne l'index / colonne 
function findFirstCritere(cjTab){

    var val_of_max_value =  Math.max.apply(Math, cjTab).toString(); // la valeur max
    var index_of_first_critere = (cjTab.indexOf(val_of_max_value)); // l'index de la valeur max 
    return index_of_first_critere;
}

// 8 ) Trouve le critere 2 
// Retourne l'index / ligne 
function findSecondCritere(qTab, gridTab, index_of_first_critere, m){
    
    for(var i = 0; i < m ; i++){
        var ratio = qTab[i] /  gridTab[i][index_of_first_critere];

        for(var j = 0; j<m ; j++){
            if (ratio < (qTab[i] / gridTab[j][index_of_first_critere])){
               var min_ratio = ratio;
               var index_of_second_critere = i;
            }
        }
    }
    return index_of_second_critere;
}

// 9) Retourne la valeur pivot 
function getPivotValue(gridTab, index_of_first_critere, index_of_second_critere ){
    return gridTab[index_of_second_critere][index_of_first_critere];
}

// 10) Mettre à jour le tableau Cp 
function updateCpTab(cpTab, index_of_second_critere, valueOfPivot){
    cpTab[index_of_second_critere] = valueOfPivot;

    return cpTab;
}



// 11) Creation du tableau Cj - Zj 
function generateCpZjTab(cjTab, cpXjTab, m, n){
   
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

// 13) MAJ des TABS 
function majAlltabs(gridTab, index_of_second_critere, index_of_first_critere,valueOfPivot, m,n){
  
   var nb_colonne =  parseInt(n) + parseInt(m);
   var test;
   var tabTest = gridTab;
 
   for(var i = 0; i < m; i++){
       for(var j =0; j<nb_colonne; j++){
           if(i == index_of_second_critere){
              
                 tabTest[i][j] = tabTest[i][j] / valueOfPivot;
           }
        }   
    }

    for(var i = 0; i < m-1; i++){
        var valeur_pivot_line = tabTest[i][index_of_first_critere];
        for(var j=0; j<nb_colonne;j++){
            if (i !== index_of_second_critere){
                  tabTest[i][j] =  tabTest[i][j] - (valeur_pivot_line * tabTest[index_of_second_critere][j]);
            } 
        }
    }
    
return tabTest;
}










