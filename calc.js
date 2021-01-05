// - - - - - - - - - - - - - -
// JS - calculatrice
// - - - - - - - - - - - - - -



// 01 - INITIALISATION 

// je créé 1 variable non définie ('undefined') que j'utiliserai pour les calculs : 

let num1;



// je créé une variable de type 'string' pour l'affichage du résultat dans l'input 'afficheur' 
// j'utilise le type 'string' pour pouvoir ajouter les chiffres à la suite les uns des autres par concaténation :

let result = "";



// je crée une fonction dont le but est de récupérer la valeur de 'result' (après l'avoir convertie en number)
// et de l'afficher dans le placeholder de l'input html 'afficheur' : 

function afficherResult() {
	document.getElementById('afficheur').placeholder = Number(result);
}

/* 
au début, j'avais un souci avec le "0" initial de l'afficheur : soit je le mettais en html dans le placeholder d'origine, 
mais il disparaissait quand je cliquais sur 'egal', car 'egal' renvoie 'result' vide (result = "";) ! 
soit je mettais 'result = "0";' dans l'initialisation mais lorsqu'on tapait le 1er chiffre, il restait devant --> ex: je tape "1", il affiche "01" !

par la suite, j'ai trouvé que quand on converti une string vide en number, ça renvoie "0" ! 
parfait pour mon souci, il m'a suffit de rajouter 'Number()' autour de 'result' ! 
'resutl' est donc vide à l'initialisation mais 'Number('result');' affiche bien "0" dans l'afficheur, 
et ce "0" disparaitra lorsqu'on entrera notre 1er chiffre puisque 'result' ne sera plus vide ! 

BONUS ! ça me règle aussi un second souci : avec une string, quand elle affiche "0" au chargement de la page, si j'appuie X fois sur "0", autant de "0" s'affichent !
alors qu'avec une vraie calculette, tant qu'on est sur "0", elle n'en affiche qu'un seul, même si on appuie plusieurs fois dessus. 
ça n'est plus le cas grâce à 'Number(result)', car 'Number("000000000")' renvoie juste "0" ;) 

*/



// - - - - - - - - - - - - - -



// 02 - LES BOUTONS 'DIGITS' : 

// je capte le clic sur un bouton 'digit' et attribut sa valeur à 'result' 
// puis l'affiche dans input 'afficheur' grâce à la fonction 'afficherResult()' : 

document.getElementById('digit1').onclick = () => {
	result += "1";
	afficherResult();
}

document.getElementById('digit2').onclick = () => {
	result += "2";
	afficherResult();
}

document.getElementById('digit3').onclick = () => {
	result += "3";
	afficherResult();
}

document.getElementById('digit4').onclick = () => {
	result += "4";
	afficherResult();
}

document.getElementById('digit5').onclick = () => {
	result += "5";
	afficherResult();
}

document.getElementById('digit6').onclick = () => {
	result += "6";
	afficherResult();
}

document.getElementById('digit7').onclick = () => {
	result += "7";
	afficherResult();
}

document.getElementById('digit8').onclick = () => {
	result += "8";
	afficherResult();
}

document.getElementById('digit9').onclick = () => {
	result += "9";
	afficherResult();
}

document.getElementById('digit0').onclick = () => {
	result += "0";
	afficherResult();
}

// cas particulier du "." : 
// si on appuie sur "." en tout premier, avant n'importe quel autre bouton, cela affiche "NaN" car il convertit la string "." en number ! 
// du coup, je rajoute un if : si result est vide, il rajoutera un "0" devant le "." --> si on tape ".9" cela affichera "0.9"
// sinon on affiche juste 'result' ajouté d'un "." : 
document.getElementById('point').onclick = () => {
	if(result === "") {
		result += ".";
		document.getElementById('afficheur').placeholder = `0${result}`;
	} else {
		result += ".";
		afficherResult();	
	}	
}



// - - - - - - - - - - - - - -



// 03 - LES BOUTONS 'OPERATEURS' : 

// je crée une variable 'operateur' qui changera en fonction du bouton operateur cliqué : 

let operateur; 



// je crée une fonction qui prépare le calcul en envoyant la conversion en number de 'result' dans 'num1' si celle-ci est 'undefined' (comme en début de code), 
// ou dans 'num2' si 'num1' n'est plus 'undefined' : 

function preparerCalcul() {
	if(num1 === undefined) {
		num1 = Number(result);
		result = "";
	} else {
		// num2 = Number(result);
		executerCalcul(); 			// --> result = num1 'operateur' Number(result); 
		afficherResult();			// j'affiche 'result' dans 'afficheur'
		num1 = Number(result);		// je conserve le résultat du calcul précédent dans 'num1' au cas où on relance un nouveau calcul 
		result = "";				// je remets 'result' en string vide 
	}
}


// je crée une fonction qui effectuera le calcul 
// avec un switch en fonction de l'opérateur cliqué : 

function executerCalcul() {
	switch(operateur) {
		case "plus":
			result = num1 + Number(result);
			break;

		case "moins":
			result = num1 - Number(result);
			break;

		case "fois":
			result = num1 * Number(result);
			break;

		case "divise": 
			result = num1 / Number(result);
			break;

		case "neutre":
			result = num1;
			break;

		default: 
			console.log("Ceci n'est pas sensé apparaitre !");
	}
}



// à chaque fois que je clique sur un bouton opérateur, je change la valeur de la variable 'operateur' pour savoir quelle opération effectuer : 

document.getElementById('plus').onclick = () => {
	preparerCalcul();
	operateur = "plus";
}

document.getElementById('moins').onclick = () => {
	preparerCalcul();
	operateur = "moins";
}

document.getElementById('fois').onclick = () => {
	preparerCalcul();
	operateur = "fois";
}

document.getElementById('divise').onclick = () => {
	preparerCalcul();
	operateur = "divise";
}



/*
// puis je crée une fonction qui calculera 'num1' et 'num2' : 

const executerCalcul = () => {
	document.getElementById('plus').onclick = () => additionner(num1, num2);
	document.getElementById('moins').onclick = () => soustraire(num1, num2);
	document.getElementById('fois').onclick = () => multiplier(num1, num2);
	document.getElementById('divise').onclick = () => diviser(num1, num2);
}
*/



	




// version longue --> chaque opérateur : 
/*
document.getElementById('plus').onclick = () => {
	if(num1 === undefined) { 						// si num1 est vide 
		num1 = Number(result);						// envoie la conversion en number de la string 'result' dans 'num1' 
		result = "";								// puis remets 'result' vide 
	} else {										// sinon
		num2 = Number(result);						// envoie la conversion en number de la string 'result' dans 'num2' 
		result = num1 + num2;						// puis additionne num1 et num2 
		afficherResult();							// puis affiche 'result' dans 'afficheur'
		num1 = result; 								// puis envoie 'result' dans 'num1' au cas où on relance une nouvelle opération 
		result = "";								// puis remets 'result' vide 
	}
}

document.getElementById('moins').onclick = () => {
	if(num1 === undefined) {
		num1 = Number(result);
		result = "";
	} else {
		num2 = Number(result);
		result = num1 - num2;
		afficherResult();
		num1 = result;
		result = "";
	}
}

document.getElementById('fois').onclick = () => {
	if(num1 === undefined) {
		num1 = Number(result);
		result = "";
	} else {
		num2 = Number(result);
		result = num1 * num2;
		afficherResult();
		num1 = result;
		result = "";
	}
}

document.getElementById('divise').onclick = () => {
	if(num1 === undefined) {
		num1 = Number(result);
		result = "";
	} else {
		num2 = Number(result);
		result = num1 / num2;
		afficherResult();
		num1 = result;
		result = "";
	}
}
*/









/*
// version : quand je clique sur n'importe quel 'operateur' : 

let boutonsOperateurs = document.getElementsByClassName('operateurs');

for (let element of boutonsOperateurs) {
	element.onclick = () => preparerCalcul();
}


const preparerCalcul = () => {
	if(num1 === undefined) {
		num1 = Number(result);
		result = "";
		 
		console.log(`num1 = ${num1}`);
		console.log(typeof num1);
		console.log(`num2 = ${num2}`);
		console.log(typeof num2);
		console.log(`result = ${result}`);
		
	} else {
		num2 = Number(result);
		result = "";
		// calculer();
		// 

		console.log(`num1 = ${num1}`);
		console.log(typeof num1);
		console.log(`num2 = ${num2}`);
		console.log(typeof num2);
		console.log(`result = ${result}`);
		
	}	
}
*/









/*
const additionner = () => result = num1 + num2;
const soustraire  = () => result = num1 - num2;
const multiplier  = () => result = num1 * num2;
const diviser     = () => result = num1 / num2;

document.getElementById('plus').onclick   = () => additionner();
document.getElementById('moins').onclick  = () => soustraire();
document.getElementById('fois').onclick   = () => multiplier();
document.getElementById('divise').onclick = () => diviser();
*/ 






















// - - - - - - - - - - - - - -



// 04 - LES BOUTONS 'MODIFIEURS' : 

document.getElementById('egal').onclick = () => {

	preparerCalcul();
	operateur = "neutre";
}







/*
// lors du clic sur 'reset', si on met 'result = 0', il affichera le "O" devant la prochaine entrée de chiffre.
// ex : afficheur affiche "0", je clique sur "2", il affichera "02" ! 
// or, je veux que le "0" disparaisse lors de l'entrée d'un 1er chiffre, donc : 
document.getElementById('reset').onclick = () => {
	// je remets 'result' vide au lieu de "0"
	result = ""; 
	// et j'affiche "manuellement" "0" dans 'afficheur', plutôt que d'afficher 'result'
	document.getElementById('afficheur').placeholder = "0"; 
}
*/

// variante 'reset' : 
document.getElementById('reset').onclick = () => {
	num1 = undefined;
	result = "";
	afficherResult();
}



// - - - - - - - - - - - - - -



// - - - - - - - - - - - - - -
/* 		TO DO : 
// - - - - - - - - - - - - - -

[BUG] quand on veut taper "0.009", il n'affiche pas les "0" tant qu'on ne met pas un autre chiffre (à cause du 'Number(result)')

[AJOUT] changer la couleur de l'opérateur cliqué 

[AJOUT] quand on appuie sur un opérateur, on ne doit plus pouvoir appuyer sur le même, et si on clique sur un autre, ça le remplace 

[AJOUT] possibilité de modifier le dernier chiffre (touche "C") au lieu de tout effacer (touche "AC") 

[AJOUT] taper avec les chiffres / opérateurs du clavier 



TESTS : pour vérifier les valeurs des variables : 

console.log(result);
console.log(num1);
console.log(operateur);






*/


