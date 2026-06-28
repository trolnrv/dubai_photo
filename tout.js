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
ajouterBouton("🔄Charger les nouveaux fichiers🔄", () => {
	refresh();
});
await charger();
