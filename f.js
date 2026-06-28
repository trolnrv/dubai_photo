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
	let fichierID = getPathsInfos();
	for (let feuille in fichiers[fichierID].feuilles){
		ajouterBouton(feuille + "📊", () => {
			aller(`/cam/${fichierID}/${encodeURIComponent(feuille)}`);
		});
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
