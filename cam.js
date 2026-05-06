import { startCamera, saveDessins } from "./caméra.js";
import { log } from "./utils.js";
import { initColoriage, initZoom, showCameraUI, showEditUI, cantdraw } from "./dessin.js";


function initBoutons(){
	document.getElementById("btnCroix")
		.addEventListener("click", () => {
			const dessin = document.getElementById("dessin");
			const ctxDessin = dessin.getContext("2d");
			ctxDessin.clearRect(0, 0, dessin.width, dessin.height);
			const photo = document.getElementById("photo");
			const ctxPhoto = photo.getContext("2d");
			ctxPhoto.clearRect(0, 0, photo.width, photo.height);
			cantdraw();
			showCameraUI();
		});
	document.getElementById("btnReturn")
		.addEventListener("click", () => {
			window.location.href = "/";
		});
	document.getElementById("btnSwitch")
		.addEventListener("click", startCamera);
			showEditUI();
	document.getElementById("btnPhoto")
		.addEventListener("click", () => {
			const video = document.getElementById("video");
			const photo = document.getElementById("photo");
			const ctx = photo.getContext("2d");
			photo.width = video.videoWidth;
			photo.height = video.videoHeight;
			ctx.drawImage(video, 0, 0);
			initColoriage();
			showEditUI();
		});
	document.getElementById("btnValidé")
		.addEventListener("click", () => {
			concatainer();//
			const dessin = document.getElementById("dessin");
			const ctxDessin = dessin.getContext("2d");
			ctxDessin.clearRect(0, 0, dessin.width, dessin.height);
			const photo = document.getElementById("photo");
			const ctxPhoto = photo.getContext("2d");
			ctxPhoto.clearRect(0, 0, photo.width, photo.height);
			cantdraw();
			showCameraUI();
		});
}
function concatainer(){
	const dessin = document.getElementById("dessin");
	const ctxDessin = dessin.getContext("2d");
	const photo = document.getElementById("photo");
	const ctxPhoto = photo.getContext("2d");
	const ffinal = document.getElementById("final");
	const ctxfinal = ffinal.getContext("2d");
	{
		const video = document.getElementById("video");
		ffinal.width = video.videoWidth;
		ffinal.height = video.videoHeight;
	}
	ctxfinal.drawImage(photo, 0, 0);
	ctxfinal.drawImage(dessin, 0, 0);
	saveDessins("final", "1P7oM4sAkM87rDaaJtDM5WSxZW-ow5d4wA68dd8cozTo", "Feuille 1");
}


startCamera();
initBoutons();
showCameraUI();


initZoom();
