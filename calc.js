// - - - - - - - - - - - - - -
// JS - calculatrice
// - - - - - - - - - - - - - -



// 01 - INITIALISATION 

// je créé une variable de type 'string' pour l'affichage du résultat dans l'input 'afficheur' 
// j'utilise le type 'string' pour pouvoir ajouter les chiffres à la suite les uns des autres par concaténation :

let result = "";

// je crée une fonction dont le but est de récupérer la valeur de 'result' 
// et de l'afficher dans le placeholder de 'afficheur' 
// si la valeur affichée n'est pas un nombre, je remplace "NaN" par "Error !"
// sinon si 'result' est vide, j'affiche la valeur de 'result' convertie en Number, soit "0" car conversion en Number de string vide = "0"
// sinon j'affiche juste 'result' :

function afficherResult() {
	if(isNaN(result)){
		result = "Error !";
		document.getElementById('afficheur').placeholder = result;
	} else if(result === "") {
		document.getElementById('afficheur').placeholder = Number(result);
	} else {
		document.getElementById('afficheur').placeholder = result;
	}	
}

/* 
au début, j'avais un souci avec le "0" initial de l'afficheur : soit je le mettais en html dans le placeholder d'origine, 
mais il disparaissait quand je cliquais sur 'egal', car 'egal' renvoie 'result' vide (result = "";) ! 
soit je mettais 'result = "0";' dans l'initialisation mais lorsqu'on tapait le 1er chiffre, il restait devant --> ex: je tape "1", il affiche "01" !

par la suite, j'ai trouvé que quand on converti une string vide en number, ça renvoie "0" ! 
parfait pour mon souci, il m'a suffit de rajouter 'Number()' autour de 'result' ! 
'result' est donc vide à l'initialisation mais 'Number('result');' affiche bien "0" dans l'afficheur, 
et ce "0" disparaitra lorsqu'on entrera notre 1er chiffre puisque 'result' ne sera plus vide ! 

BONUS ! ça me règle aussi un second souci : avec une string, quand elle affiche "0" au chargement de la page, si j'appuie X fois sur "0", autant de "0" s'affichent !
alors qu'avec une vraie calculette, tant qu'on est sur "0", elle n'en affiche qu'un seul, même si on appuie plusieurs fois dessus. 
ça n'est plus le cas grâce à 'Number(result)', car 'Number("000000000")' renvoie juste "0" ;) 

MALUS (en cours de résolution) ! ça me génère un autre souci : quand je veux taper "0.0..." tant que je ne tape pas un chiffre autre que "0",
ça affiche juste "0" car 'Number(0.000.....)' renvoie "0" ! 
*/

// - - - - - - - - - - - - - -



// 02 - LES BOUTONS 'DIGITS' : 

// je capte le clic sur un bouton 'digit' et rajoute sa valeur à 'result' par concaténation
// puis je l'affiche dans mon input HTML 'afficheur' grâce à la fonction 'afficherResult()' : 

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

// cas particulier du "0" quand en 1ere position : 
// si on veut taper "0.0009", on ne voit pas les "0" s'afficher au fur et à mesure que l'on tape car j'utilise 'Number(result)', qui affiche seulement "0" tant qu'aucun autre chiffre n'est tapé (le bon résultat s'affiche dès qu'on tape autre chose que "0")
// du coup je rajoute un if : si 'result' === "", on ne fait rien ('instruction vide' --> ";") 
// sinon on concatène "0" avec 'result' :
document.getElementById('digit0').onclick = () => {
	if(result === "") { 
		/* instruction vide = rien à faire */
		;
	} else {
		result += "0";
		afficherResult();
	}
}

// cas particulier du "." quand en 1ere position : 
// si on appuie sur "." en tout premier, avant n'importe quel autre bouton, cela affiche "NaN" car il convertit la string "." en number ! 
// du coup, je rajoute un if : si 'result' est vide, il rajoutera un "0" devant le "." --> si on tape ".9" cela affichera "0.9"
// sinon on affiche juste 'result' ajouté d'un "." : 
document.getElementById('point').onclick = () => {
	if(result === "") {
		result = "0.";
		afficherResult();
	} else {
		result += ".";
		afficherResult();	
	}	
}



// - - - - - - - - - - - - - -



// 03 - LES BOUTONS 'OPERATEURS' ET LES CALCULS : 

// je créé 1 variable non définie ('undefined') que j'utiliserai pour les calculs : 

let num1;

// je crée une variable 'operateur' qui changera en fonction du bouton operateur cliqué : 

let operateur; 

// je crée une fonction qui prépare le calcul en envoyant la conversion en number de 'result' dans 'num1' si celle-ci est 'undefined' (comme en début de code), 
// sinon on execute le calcul, on affiche son résultat, puis on envoie ce nouveau résultat dans num1 pour la suite du calcul, enfin on remet 'result' en string vide : 

function preparerCalcul() {
	if(num1 === undefined) {
		num1 = Number(result);
		result = "";
	} else {
		executerCalcul();
		afficherResult();
		num1 = Number(result);
		result = "";
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

// à chaque fois que je clique sur un bouton opérateur, si 'result' n'affiche pas "Error !" (auquel cas je ne fais rien d'autre qu'afficher le message d'erreur), je prépare le calcul et je change la valeur de la variable 'operateur' pour savoir quelle opération effectuer : 

document.getElementById('plus').onclick = () => {
	if(result === "Error !") {
		afficherResult;
	} else {
		preparerCalcul();
		operateur = "plus";
		// [WIP] switcher couleur bouton 
	}
}

document.getElementById('moins').onclick = () => {
	if(result === "Error !") {
		afficherResult;
	} else {
		preparerCalcul();
		operateur = "moins";
	}
}

document.getElementById('fois').onclick = () => {
	if(result === "Error !") {
		afficherResult;
	} else {
		preparerCalcul();
		operateur = "fois";
	}
}

document.getElementById('divise').onclick = () => {
	if(result === "Error !") {
		afficherResult;
	} else {
		preparerCalcul();
		operateur = "divise";
	}
}



/*

// - - - - - - - - - - - - - -
Tout ce qui suit est conservé juste pour voir l'évolution de la logique du code ^^'
// - - - - - - - - - - - - - -



// puis je crée une fonction qui calculera 'num1' et 'num2' : 

const executerCalcul = () => {
	document.getElementById('plus').onclick = () => additionner(num1, num2);
	document.getElementById('moins').onclick = () => soustraire(num1, num2);
	document.getElementById('fois').onclick = () => multiplier(num1, num2);
	document.getElementById('divise').onclick = () => diviser(num1, num2);
}



// version longue --> chaque opérateur : 

document.getElementById('plus').onclick = () => {
	if(num1 === undefined) { 						// si num1 est vide 
		num1 = Number(result);						// envoie la conversion en number de la string 'result' dans 'num1' 
		result = "";									// puis remets 'result' vide 
	} else {										// sinon
		num2 = Number(result);						// envoie la conversion en number de la string 'result' dans 'num2' 
		result = num1 + num2;						// puis additionne num1 et num2 
		afficherResult();							// puis affiche 'result' dans 'afficheur'
		num1 = result; 								// puis envoie 'result' dans 'num1' au cas où on relance une nouvelle opération 
		result = "";									// puis remets 'result' vide 
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



// encore une autre version : 

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

// bouton "=" : on effectue le calcul puis on remet 'operateur' à 'neutre' pour l'éventuel calcul suivant : 
document.getElementById('egal').onclick = () => {
	preparerCalcul();
	operateur = "neutre";
}

// bouton "C" (reset) : 

// 1ere version : 

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

// variante simplifiée : 

document.getElementById('reset').onclick = () => {
	num1 = undefined;
	result = "";
	afficherResult();
}



// - - - - - - - - - - - - - -
// - - - - - - - - - - - - - -
// - - - - - - - - - - - - - -
// - - - - - - - - - - - - - -
// - - - - - - - - - - - - - -



// - - - - - - - - - - - - - -
/* 		BUGS : 
// - - - - - - - - - - - - - -

[WIP] "Error !" #1, avec 2x "." : quand on tape 2x sur "." cela affiche "Error !", je voudrais juste désactiver le "." s'il a été tapé une fois déjà

[WIP] "Error !" #2, avec "/" : à l'initialisation, quand je clique sur "/" il envoie 'Number("")' donc "0" à 'num1', et si je clique à nouveau sur "/" ou sur "=", il fait le calcul "O/O" qui renvoie "Error !" (= NaN) ; mais dans la fonction, il vide 'result' (= "") donc si on tape un nouveau chiffre, il l'affiche direct, alors que je voudrais que "Error !" reste affiché jusqu'à ce qu'on reset le tout ( "C" ) - - ce bug ainsi que le précédent seront résolus si j'arrive à implémenter la feature qui consiste à neutraliser les appuis sur un opérateur quand celui-ci est déjà "cliqué"

[FIXED] "00000" : quand on veut taper "0.009", il n'affiche pas les "0" tant qu'on ne met pas un autre chiffre à cause du 'Number(result)'



// - - - - - - - - - - - - - -
/* 		FEATURES : 
// - - - - - - - - - - - - - -


- changer la couleur de l'opérateur cliqué 

- quand on appuie sur un opérateur, on ne doit plus pouvoir appuyer sur le même, et si on clique sur un autre, ça le remplace 

- possibilité de modifier le dernier chiffre (touche "C") au lieu de tout effacer (touche "AC") 

- taper avec les chiffres / opérateurs du clavier 

*/
