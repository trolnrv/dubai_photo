import { startCamera, takePhoto } from "./caméra.js";
import { log } from "./utils.js";
import { initColoriage, initZoom, showCameraUI, showEditUI, cantdraw } from "./dessin.js";


function initBoutons(){
	document.getElementById("btnCroix")
		.addEventListener("click", () => {
			const dessin = document.getElementById("dessin");
			const ctxDessin = dessin.getContext("2d");
			ctxDessin.clearRect(0, 0, dessin.width, dessin.height);//
			const photo = document.getElementById("photo");
			const ctxPhoto = photo.getContext("2d");
			ctxPhoto.clearRect(0, 0, photo.width, photo.height);//
			cantdraw();
			showCameraUI();
		});
	document.getElementById("btnReturn")
		.addEventListener("click", () => {
			window.location.href = "/";
			showEditUI();
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
			const dessin = document.getElementById("dessin");
			const ctxDessin = dessin.getContext("2d");
			ctxDessin.clearRect(0, 0, dessin.width, dessin.height);//
			const photo = document.getElementById("photo");
			const ctxPhoto = photo.getContext("2d");
			ctxPhoto.clearRect(0, 0, photo.width, photo.height);//
			cantdraw();
			showCameraUI();
		});
}
//ctx.clearRect(0, 0, canvas.width, canvas.height);


startCamera();
initBoutons();
showCameraUI();


initZoom();
