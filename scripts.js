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

            // var gridTab = generateGridTab(n,m);
            // var cjTab = generateCjTab(n,m);
            // var qTab = generateQTab(m);
        
            /* INITIALISATION */ 
            var gridTab = [
                [2,1],
                [2,3],
                [3,1],
            ];
            var cjTab = [3,2,0,0,0];
            var qTab =  [18,42,24];
            var cpTab = generateCpTab(m);
            var outpoutVariablesTab = generateOutputVariables(n, m);
            var gridTab = addOutputVariables(gridTab, n, m, outpoutVariablesTab);


            var cpXjTab = generateCpXjTab(cpTab, gridTab,n,m);
            var cjZjTab = generateCjZjTab(cjTab, cpXjTab, m,n);
            z = calculZ(cpTab, qTab, m);
            console.log(z);

            
            var index_of_first_critere = findFirstCritere(cjZjTab);
            var index_of_second_critere = findSecondCritere(qTab, gridTab, index_of_first_critere, m);
            var valueOfPivot = getPivotValue(gridTab, index_of_first_critere, index_of_second_critere);
            var cpTab = updateCpTab(cpTab, cjTab, index_of_first_critere, index_of_second_critere, valueOfPivot);
            var qTab = updateQtabAfterPivot(qTab, gridTab, index_of_second_critere, index_of_first_critere, valueOfPivot, m,n);
            var gridTab = updateGridTabAfterPivot(gridTab, index_of_second_critere, index_of_first_critere, valueOfPivot, m,n);
            z = calculZ(cpTab, qTab, m);
            console.log(z);

            var cpXjTab = generateCpXjTab(cpTab, gridTab,n,m);
            var cjZjTab = generateCjZjTab(cjTab, cpXjTab, m,n);

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

         
            console.log(gridTab);
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





            
            




           
            // console.log(cjZjTab);
            
          



            // var cpXjTab = generateCpXjTab(cpTab, gridTab,n,m);
            // var cjZjTab = generateCjZjTab(cjTab, cpXjTab, m,n);

            // z = calculZ(cpTab, qTab, m);
            // console.log(z);


            // var continuer = verifyValuesOfCpCz(cjZjTab, n, m);
            
            // var i =1;
            // var iteration = 4;
            // while(i<iteration){

            //     console.log("Iteration" + i);

            //     var index_of_first_critere = findFirstCritere(cjZjTab);
            //     var index_of_second_critere = findSecondCritere(qTab, gridTab, index_of_first_critere, m);
            //     var valueOfPivot = getPivotValue(gridTab, index_of_first_critere, index_of_second_critere);

            //     if (i == 3){
            //         console.log(index_of_first_critere,index_of_second_critere,valueOfPivot);
            //     }
                
            //     var qTab = updateQtabAfterPivot(qTab, gridTab, index_of_second_critere, index_of_first_critere, valueOfPivot, m,n);
            //     console.log("qTab",qTab);
            //     var gridTab = updateGridTabAfterPivot(gridTab, index_of_second_critere, index_of_first_critere, valueOfPivot, m,n);
                
            //     var cpTab = updateCpTab(cpTab, cjTab, index_of_first_critere, index_of_second_critere, valueOfPivot);
            //     console.log("cp",cpTab);
              

            //     console.log("grid",gridTab);

            //     var cpXjTab = generateCpXjTab(cpTab, gridTab,n,m);
            //     var cjZjTab = generateCjZjTab(cjTab, cpXjTab, m,n);

            //     z = calculZ(cpTab, qTab, m);
            //     console.log(z);
                
            //     continuer = verifyValuesOfCpCz(cjZjTab, n, m);
               
            //     i++;
 
            // }
          

            



//  /*ZJ */    var cpXjTab = generateCpXjTab(cpTab, gridTab,n,m);
// /*Cj - Zj */ var cjZjTab = generateCjZjTab(cjTab, cpXjTab, m,n);

//             console.log("itéation 0");
//             alert("iteration" + gridTab);
//             var z = calculZ(cpTab, qTab, m);
//             console.log(z);

//             /* FIN INITIALISATION */ 

//              /* Iteration 1 */ 
//             /* Je Mets à jour la table CP */ 
//             console.log("Itération 1");
//             alert("iteration" + gridTab);
//             /* TROUVER LES CRITERES */ 
//             var index_of_first_critere = findFirstCritere(cjZjTab);
//             var index_of_second_critere = findSecondCritere(qTab, gridTab, index_of_first_critere, m);
//             var valueOfPivot = getPivotValue(gridTab, index_of_first_critere, index_of_second_critere );
       
//             var cpTab = updateCpTab(cpTab, cjTab, index_of_first_critere, index_of_second_critere, valueOfPivot);
//             qTab = updateQtabAfterPivot(qTab, gridTab, index_of_second_critere, index_of_first_critere, valueOfPivot, m,n);
//             gridTab = updateGridTabAfterPivot(gridTab, index_of_second_critere, index_of_first_critere, valueOfPivot, m,n);
            
//             var cpXjTab = generateCpXjTab(cpTab, gridTab,n,m);
//             var cjZjTab = generateCjZjTab(cjTab, cpXjTab, m,n);
//             var z = calculZ(cpTab, qTab, m);
//             console.log(z);  


//             console.log("Itération 2");
//             alert("iteration" + gridTab);
//             index_of_first_critere = findFirstCritere(cjZjTab);
//             index_of_second_critere = findSecondCritere(qTab, gridTab, index_of_first_critere, m);
//             valueOfPivot = getPivotValue(gridTab, index_of_first_critere, index_of_second_critere );
//             console.log(index_of_first_critere);
//             console.log(index_of_second_critere);
//             console.log(valueOfPivot);


//             cpTab = updateCpTab(cpTab, cjTab, index_of_first_critere, index_of_second_critere, valueOfPivot);
//             console.log(cpTab);
//             qTab = updateQtabAfterPivot(qTab, gridTab, index_of_second_critere, index_of_first_critere, valueOfPivot, m,n);
//             gridTab = updateGridTabAfterPivot(gridTab, index_of_second_critere, index_of_first_critere, valueOfPivot, m,n);

           
            
//             cpXjTab = generateCpXjTab(cpTab, gridTab,n,m);
//             cjZjTab = generateCjZjTab(cjTab, cpXjTab, m,n);
//             z = calculZ(cpTab, qTab, m);
//             console.log(z);  

            // console.log("Itération 3");
    
            // index_of_first_critere = findFirstCritere(cjZjTab);
            // index_of_second_critere = findSecondCritere(qTab, gridTab, index_of_first_critere, m);
            // valueOfPivot = getPivotValue(gridTab, index_of_first_critere, index_of_second_critere );

           
            // qTab = updateQtabAfterPivot(qTab, gridTab, index_of_second_critere, index_of_first_critere, valueOfPivot, m,n);
            // gridTab = updateGridTabAfterPivot(gridTab, index_of_second_critere, index_of_first_critere, valueOfPivot, m,n);
            
            // z = calculZ(cpTab, qTab, m);
            // console.log(z); 
            

            
            
           

            
       
}

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
   
    // for(var i = 0; i < m ; i++){
    //     if( qTab[0] / gridTab[0][index_of_first_critere] > 0){
    //         var ratio = qTab[0] /  gridTab[0][index_of_first_critere];
    //     }
    //     else {
    //         var ratio = qTab[1] /  gridTab[1][index_of_first_critere];
    //     }
        
    //     var index_of_second_critere = 0;
    //     if (ratio > qTab[i] / gridTab[i][index_of_first_critere]){
    //          ratio = qTab[i] / gridTab[i][index_of_first_critere];
    //          alert(ratio);
    //          index_of_second_critere = i;
    //     }
    // }

    // qTab[i] / gridTab[i][index_of_first_critere]

    // if(qTab[0] / gridTab[0][index_of_first_critere] > 0){
        var min = qTab[0] / gridTab[0][index_of_first_critere];
        if(min < 0){
            min = qTab[1] / gridTab[1][index_of_first_critere];
        }
    // }
    var temp = new Array();
    var index_of_second_critere = 0;

    for(var i= 0; i<m; i++){
        temp[i] = qTab[i] / gridTab[i][index_of_first_critere];
    }
   

    for(var i =0; i<m; i++){
      
        if(temp[i] > 0){
            alert(temp[i] + "<=" + min);
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
        if(cjZjTab[i] >= 0){
            return true; 
        }
      }
    return false;
}

// 13) MAJ des TABS 
// function updateGridTabAfterPivot(gridTab, index_of_second_critere, index_of_first_critere,valueOfPivot, m,n){
  
//    var nb_colonne =  parseInt(n) + parseInt(m);

//    for(var i = 0; i < m; i++){
//        for(var j =0; j<nb_colonne; j++){
//            if(i == index_of_second_critere){
//             gridTab[i][j] = parseFloat(gridTab[i][j]) / parseFloat(valueOfPivot);
//            }
//         }   
//     }

//     for(var i = 0; i < m-1; i++){
//         var valeur_pivot_line = gridTab[i][index_of_first_critere];
//         for(var j=0; j<nb_colonne;j++){
//             if (i !== index_of_second_critere){
//                 gridTab[i][j] =  parseFloat(gridTab[i][j]) - (parseFloat(valeur_pivot_line) * parseFloat(gridTab[index_of_second_critere][j]));
//             } 
//         }
//     }
//     return gridTab;
// }




function updateGridTabAfterPivot(gridTab, index_of_second_critere, index_of_first_critere,valueOfPivot, m,n){
   
    var nb_colonne =  parseInt(n) + parseInt(m);

    for(var i = 0; i < m; i++){
        for(var j =0; j<nb_colonne; j++){
            if(i == index_of_second_critere){
                alert("Mon putain de I ! " + i);
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
        // alert(cpTab[i] + ' ' +qTab[i])
        z = z +  (cpTab[i] * qTab[i]);
    }
    return z;
}










