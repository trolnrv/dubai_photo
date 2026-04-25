import { log, getSheetIdFromUrl } from "./utils.js";
import { download, upload } from "./réseau.js";

const state = {}
let freezState = true;
export async function initState() {
	log("On initialise l'Etat.");
	state.fichiers = [];
	const data = await download();
	if (data){
		state.fichiers = data.fichiers;
		freezState = true;
		state.fichiers.forEach(fichier => {
			console.log("On a le fichier: ", fichier);
			addItem(fichier);
		});
	} else {console.error("La data a mal été téléchargée.");}
	freezState = false;
}

function updateStateFromDOM() {
	if(!freezState){
		log("updateStateFromDOM");
		const list = document.getElementById("list");
		state.fichiers = [...list.children].map(item => JSON.parse(item.dataset.data));
		console.log("state.fichiers =", state.fichiers);

		upload(state);
	} else {log("updateStateFromDOM échoué");}
}

export function initGlissade(){
	const el = document.getElementById("list");
	if (!el) {
		console.error("❌ #list introuvable");
		return;
	}
	new Sortable(el, {
		animation: 150,
		filter: ".doc, .delete",
		preventOnFilter: false,
		onUpdate: (evt) => {
			console.log("Liste modifiée");
			updateStateFromDOM();
		},
		onEnd: updateStateFromDOM,
	});

	//Pas obligatoirement après le DOM
	document.addEventListener("click", (e) => {
		if (e.target.classList.contains("label")) {
			console.log("📄 Ouvrir item");
			const item = e.target.closest(".item");
			const fichier = JSON.parse(item.dataset.data);
			const id = getSheetIdFromUrl(fichier.fichier);
			const feuille = encodeURIComponent(fichier.feuille);
			window.location.href = `/cam/${id}/${feuille}`;
		}

		if (e.target.classList.contains("doc")) {
			const item = e.target.closest(".item");
			const fichier = JSON.parse(item.dataset.data);

			console.log("📁 Ouvrir document :", fichier.fichier);

			window.open(fichier.fichier, "_blank", "noopener,noreferrer"); // 🔥 ouvre l'URL
		}

		if (e.target.classList.contains("delete")) {
			console.log("❌ Supprimer");
			e.target.closest(".item").remove();
			updateStateFromDOM();
		}
	});
}

function addItem(fichier) {
	const list = document.getElementById("list");
	const text = fichier.nom;

	if (!list) {
		console.error("❌ .list introuvable");
		return;
	}

	const item = document.createElement("div");
	item.className = "item";

	item.innerHTML = `
    <div class="label">${text}</div>
    <div class="actions">
      <span class="doc">📄</span>
      <span class="delete">✖</span>
    </div>
  `;
	item.dataset.data = JSON.stringify(fichier);

	list.appendChild(item);
	updateStateFromDOM()
	console.log("state.fichiers =", state.fichiers);
}

export async function nouveau(){
	const nom = document.getElementById("nom").value;
	const fichier = document.getElementById("fichier").value;
	const feuille = document.getElementById("feuille").value;
	log("text rentré: " + nom + "\nfichier rentré: " + fichier + "\nfeuille rentrée: " + feuille);
	addItem({nom: nom, fichier: fichier, feuille: feuille,});
}
