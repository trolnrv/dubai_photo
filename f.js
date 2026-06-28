import { download, refresh } from "./réseau.js";
function ajouterBouton(message, fonction){
	let bouton = document.createElement('button');
	bouton.innerText = message;
	bouton.addEventListener('click', fonction);
	document.body.appendChild(bouton);
}
function aller(lien){
	window.location.href = lien;
}
function getPathsInfos(){
	const path = window.location.pathname;
	const suffixe = path.split("/f/")[1];
	const parties = suffixe.split("/");
	return parties[0];
}
async function charger(){
	ajouterBouton("🔄Charger les nouveaux fichiers🔄", recharger);
	const data = await download();
	let fichiers = data.fichiers;
	console.log(fichiers);
	let fichierID = getPathsInfos();
	for (let feuille in fichiers[fichierID].feuilles){
		ajouterBouton(feuille + "📊", () => {
			aller(`/cam/${fichierID}/${encodeURIComponent(feuille)}`);
		});
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
