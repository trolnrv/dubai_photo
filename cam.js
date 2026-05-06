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
			//ctx.drawImage(video, 0, 0);//
			//belleImage();
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

function concatainer(){//{{{
	const dessin = document.getElementById("dessin");
	const ctxDessin = dessin.getContext("2d");
	const photo = document.getElementById("photo");
	const ctxPhoto = photo.getContext("2d");
	const ffinal = document.getElementById("final");
	const ctxFinal = ffinal.getContext("2d");
	{
		const video = document.getElementById("video");
		ffinal.width = video.videoWidth;
		ffinal.height = video.videoHeight;
	}
	ctxFinal.drawImage(photo, 0, 0);
	ctxFinal.drawImage(dessin, 0, 0);
	saveDessins("final", "1P7oM4sAkM87rDaaJtDM5WSxZW-ow5d4wA68dd8cozTo", "Feuille 1");
	ctxFinal.clearRect(0, 0, dessin.width, dessin.height);
}//}}}

function belleImage(){//{{{
	const video = document.getElementById("video");
	const photo = document.getElementById("photo");
	const ctx = photo.getContext("2d");

	const vw = video.videoWidth;
	const vh = video.videoHeight;

	const cw = photo.width;
	const ch = photo.height;

	// ratio
	const videoRatio = vw / vh;
	const photoRatio = cw / ch;

	let sx, sy, sWidth, sHeight;

	if (videoRatio > photoRatio) {
		// vidéo trop large → crop horizontal
		sHeight = vh;
		sWidth = vh * photoRatio;
		sx = (vw - sWidth) / 2;
		sy = 0;
	} else {
		// vidéo trop haute → crop vertical
		sWidth = vw;
		sHeight = vw / photoRatio;
		sx = 0;
		sy = (vh - sHeight) / 2;
	}

	// dessiner avec crop
	ctx.drawImage(
		video,
		sx, sy, sWidth, sHeight, // source
		0, 0, cw, ch            // destination
	);
}//}}}

function belle(){//AFINIR
	const video = document.getElementById("video");
	const photo = document.getElementById("photo");
	const ctx = photo.getContext("2d");

	const ratio = video.videoHeight / photo.height; //
	ctx.drawImage(
		video,
		*, 0, *, video.videoHeight,		// source
		0, 0, photo.width, photo.height,	// destination
	);
}


startCamera();
initBoutons();
showCameraUI();


initZoom();
