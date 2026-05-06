import { log } from "./utils.js";

let candraw = false;
export function cantdraw(){ candraw = false; }
export function initColoriage(){
	const path = window.location.pathname;
	const suffixe = path.split("/cam/")[1];
	const id = suffixe.split("/")[0];
	const feuille = decodeURIComponent(suffixe.split("/")[1]);
	console.log(`id: ${id}, feuille: ${feuille}`);
	//
	const video = document.getElementById("video");
	//const dessin = document.getElementById("dessin");
	//const ctx = dessin.getContext("2d");
	//ctx.clearRect(0, 0, dessin.width, dessin.height);
	//dessin.width = video.videoWidth;
	//dessin.height = video.videoHeight;
	//ctx.drawImage(video, 0, 0);
	//belleImage("photo");
	belle("photo");
	let drawing = false;
	candraw = true;
	let lastX = null;
	let lastY = null;
	dessin.addEventListener("touchstart", (e) => {
		log("touchstart");
		drawing = true;
		const rect = dessin.getBoundingClientRect();
		const touch = e.touches[0];
		lastX = (touch.clientX - rect.left) * (dessin.width / rect.width);
		lastY = (touch.clientY - rect.top) * (dessin.height / rect.height);
	});
	dessin.addEventListener("touchend", () => {
		log("touchend");
		drawing = false;
		lastX = null;
		lastY = null;
	});
	dessin.addEventListener("touchmove", (e) => {
		if (!(drawing && candraw)) return;
		e.preventDefault(); // important mobile
		const rect = dessin.getBoundingClientRect();
		const touch = e.touches[0];
		const x = (touch.clientX - rect.left) * (dessin.width / rect.width);
		const y = (touch.clientY - rect.top) * (dessin.height / rect.height);
		// dessin
		ctx.strokeStyle = "red";
		const grosFeutre = true;
		if(grosFeutre){
			ctx.lineWidth = 10;
			ctx.globalAlpha = 0.8;
		} else { ctx.lineWidth = 5; }
		ctx.lineCap = "round";
		ctx.beginPath();
		ctx.moveTo(lastX, lastY);
		ctx.lineTo(x, y);
		ctx.stroke();
		lastX = x;
		lastY = y;
	}, { passive: false });
}
function belleImage(canvasID){//{{{
	const video = document.getElementById("video");
	const canvas = document.getElementById(canvasID);
	const ctx = canvas.getContext("2d");

	const vw = video.videoWidth;
	const vh = video.videoHeight;

	const cw = canvas.width;
	const ch = canvas.height;

	// ratio
	const videoRatio = vw / vh;
	const canvasRatio = cw / ch;

	let sx, sy, sWidth, sHeight;

	if (videoRatio > canvasRatio) {
		// vidéo trop large → crop horizontal
		sHeight = vh;
		sWidth = vh * canvasRatio;
		sx = (vw - sWidth) / 2;
		sy = 0;
	} else {
		// vidéo trop haute → crop vertical
		sWidth = vw;
		sHeight = vw / canvasRatio;
		sx = 0;
		sy = (vh - sHeight) / 2;
	}

	// dessiner avec crop
	ctx.drawImage(
		video,
		sx, sy, sWidth, sHeight,	// source
		0, 0, cw, ch,			// destination
	);
}//}}}

function belle(canvasID){
	const video = document.getElementById("video");
	const canvas = document.getElementById(canvasID);
	const ctx = canvas.getContext("2d");

	const vw = video.videoWidth;
	const vh = video.videoHeight;

	const cw = canvas.width;
	const ch = canvas.height;

	const ratio = ch / vh;
	const largeurf = vw * ratio;
	ctx.drawImage(
		video, 
		0, 0, vw, vh,	//source
		0, 0, cw, ch,	//destination
	);
}

let scale = 1;
let lastDistance = null;
const video = document.getElementById("video");
function getDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}
export function initZoom(){
	document.addEventListener("touchmove", (e) => {
		if (e.touches.length === 2) {
			e.preventDefault();

			const distance = getDistance(e.touches);

			if (lastDistance) {
				const zoomFactor = distance / lastDistance;

				scale *= zoomFactor;

				// limites
				scale = Math.min(Math.max(scale, 1), 4);

				video.style.transform = `scale(${scale})`;
			}

			lastDistance = distance;
		}
	}, { passive: false });

	document.addEventListener("touchend", () => {
		lastDistance = null;
	});
	document.addEventListener("dblclick", () => {
		scale = 1;
		video.style.transform = "scale(1)";
	});
}

const uiCamera = document.querySelector(".ui-caméra");
const uiEdit = document.querySelector(".ui-edit");

export function showCameraUI() {
  uiCamera.style.display = "flex";
  uiEdit.style.display = "none";
}

export function showEditUI() {
  uiCamera.style.display = "none";
  uiEdit.style.display = "flex";
}
