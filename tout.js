import { download, refresh } from "./réseau.js";
function ajouterBouton(message, fonction){
	let bouton = document.createElement('button');
	bouton.innerText = message;
	bouton.addEventListener('click', fonction);
	document.body.appendChild(bouton);
}
function aller(lien){
	window.location.href = lien; //window.location.href = `/cam/${id}/${feuille}`;
}
async function charger(){
	ajouterBouton("🔄Charger les nouveaux fichiers🔄", recharger);
	const data = await download();
	let fichiers = data.fichiers;
	console.log(fichiers);
	for (let fichier in fichiers){
		if (fichiers[fichier].type == "D"){
			ajouterBouton(fichiers[fichier].nom + "📁", () => {
				aller(`/d/${fichier}`);
			});
		}
		if (fichiers[fichier].type == "F"){
			ajouterBouton(fichiers[fichier].nom + "📄", () => {
				aller(`/f/${fichier}`);
			});
			for (let feuille in fichiers[fichier].feuilles){
				ajouterBouton(feuille + "📊", () => {
					aller(`/cam/${fichier}/${encodeURIComponent(feuille)}`);
				});
			}
		}
	}
}
async function recharger(){
	await refresh();
	document.querySelectorAll("button").forEach((bouton) => {
		bouton.remove();
	});
	await charger();
}
await charger();
