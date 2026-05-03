import { log, getSheetIdFromUrl, getUrlFromSheetId } from "./utils.js";
import { testerURL } from "./testes.js";
import { startCamera, takePhoto } from "./caméra.js";
import { initState, initGlissade, nouveau } from "./déroulant.js";




function initBoutons(){
	document.getElementById("btnAjouter")
		.addEventListener("click", nouveau);
	document.getElementById("btnCam")
		.addEventListener("click", startCamera);
	document.getElementById("btnPhoto")
		.addEventListener("click", () => {takePhoto("canvas", "https://docs.google.com/spreadsheets/d/1P7oM4sAkM87rDaaJtDM5WSxZW-ow5d4wA68dd8cozTo/edit?gid=0#gid=0", "Feuille 1");});
}


//Liste des fichiers{{{

document.addEventListener("DOMContentLoaded", () => {
	log("Le DOM est loadé.");
	testerURL();
	initBoutons();
	initState();
	initGlissade();
});


//}}}


