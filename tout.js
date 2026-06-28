import { download, refresh } from "./réseau.js";
function ajouterBouton(message, fonction){
	let bouton = document.createElement('button');
	bouton.innerText = message;
	bouton.addEventListener('click', fonction);
	document.body.appendChild(bouton);
}
//ajouterBouton("download", download);
ajouterBouton("🔄", () => {
	refresh();
});
const fichiers = await download().fichiers;
console.log(fichiers);
for (let fichier in fichiers){
	if (fichiers[fichier].type == "D"){
		ajouterBouton(fichiers[fichier].nom + "📁", refresh);
	}
	if (fichiers[fichier].type == "F"){
		ajouterBouton(fichiers[fichier].nom + "📄", refresh);
	}
	if (fichiers[fichier].type == "S"){
		ajouterBouton(fichiers[fichier].nom + "📊", refresh);
	}
}
//réseau || 📨 Response: {"fichiers":{"1JRWqXRXJJj5P6Zv84MQfMcttu9lEriaY":{"type":"D","nom":"Tmr","sousElements":{}},"13xpXxS2fm9jCjEZtUOCY8DgD9u0cznCn":{"type":"D","nom":"Tmp","sousElements":{}},"1_XYs8gZGjKK6X90IGBtIYbN9RQGFO6Ps":{"type":"D","nom":"Tmp","sousElements":{}},"1FLZJ7hZM1SGHOnCfoDk18waJ2CVPvukX":{"type":"D","nom":"vrac","sousElements":{}},"1ozwht3HQfyzCEQFH6OClJBF59piLfOqV":{"type":"D","nom":"Feuille 1_Images","sousElements":{}},"1w0znaFjBKelOFDp7Oau3-I2Gt8p5cqIa":{"type":"D","nom":"DebaiPhoto-520203062-26-04-18-6...
