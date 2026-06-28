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
	const suffixe = path.split("/d/")[1];
	const parties = suffixe.split("/");
	return {dossierID: parties[0], parentID: parties[1]};
}
async function charger(){
	ajouterBouton("🔄Charger les nouveaux fichiers🔄", recharger);
	const data = await download();
	let fichiers = data.fichiers;
	console.log(fichiers);
	let infos = getPathsInfos();
	console.log(infos);
	let dossierID = infos.dossierID;
	for (let child in dossierID){
		if (fichiers[child].type == "D"){
			ajouterBouton(fichiers[child].nom + "📁", () => {
				aller(`/d/${child}/${dossierID}`);
			});
		}
		if (fichiers[child].type == "F"){
			ajouterBouton(fichiers[child].nom + "📄", () => {
				aller(`/d/${child}/${dossierID}`);
			});
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
