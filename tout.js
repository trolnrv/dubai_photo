import { download, refresh, rienupload, riendownload } from "./réseau.js";
function ajouterBouton(message, fonction) {
	let bouton = document.createElement('button');
	bouton.innerText = message;
	bouton.addEventListener('click', fonction);
	document.getElementById("buttons").appendChild(bouton);
}
//function ajouterBouton(message, fonction){
//	let bouton = document.createElement('button');
//	bouton.innerText = message;
//	bouton.addEventListener('click', fonction);
//	document.body.appendChild(bouton);
//}
function aller(lien){
	window.location.href = lien; //window.location.href = `/cam/${id}/${feuille}`;
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
	};
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
				ajouterBouton(feuille + "📊 de " + fichier, () => {
					aller(`/cam/${fichier}/${encodeURIComponent(feuille)}`);
				});
			}
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
