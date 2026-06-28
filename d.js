import { download, refresh, rienupload, riendownload } from "./réseau.js";
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
	return parties[0];
}
let url = window.location.pathname;
async function charger(){
	const predata =  download();
	const preurl = riendownload();
	const data = await predata;
	url = await preurl;
	ajouterBouton("🔄Charger les nouveaux fichiers🔄", async ()=>{recharger(true);});
	if (url!=window.location.pathname){
		ajouterBouton("⬅️Retourner au dossier de référence⬅️,",
		() => {window.location.href = url;});
		ajouterBouton("📍Définir comme dossier de référence📍",
		async () => {
			await rienupload(window.location.pathname);
			await recharger(false);
		});
	}
	else {ajouterBouton("🏠Voir tous les dossiers🏠", () => {
		window.location.href = "/tout";
	});}
	let fichiers = data.fichiers;
	console.log(fichiers);
	let dossierID = getPathsInfos();
	for (let child in fichiers[dossierID].sousElements){
		if (fichiers[child].type == "D"){
			ajouterBouton(fichiers[child].nom + "📁", () => {
				aller(`/d/${child}`);
			});
		}
		if (fichiers[child].type == "F"){
			ajouterBouton(fichiers[child].nom + "📄", () => {
				aller(`/f/${child}`);
			});
		}
	}
}
async function recharger(etRefresh){
	if (etRefresh){await refresh();}
	document.querySelectorAll("button").forEach((bouton) => {
		bouton.remove();
	});
	await charger();
}
await charger();
