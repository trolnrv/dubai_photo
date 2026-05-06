import { log } from "./utils.js";

let stream = null;
let currentFacingMode = "environment";

export async function startCamera() {
  try {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    log("📷 Starting camera...");

    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: currentFacingMode,
      }
    });

    document.getElementById("video").srcObject = stream;

    log("✅ Camera started");

    currentFacingMode =
      currentFacingMode === "environment" ? "user" : "environment";

  } catch (e) {
    log("❌ Camera error: " + e.message);
  }
}

export async function takePhoto(canvasID, fichier, feuille) {
  try {
    log("📸 Taking photo...");

    const video = document.getElementById("video");
    const canvas = document.getElementById(canvasID);

    //canvas.width = video.videoWidth;
    //canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    log("📦 Image captured (size: " + image.length + ")");

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "photo",
        image: image,
        timestamp: Date.now(),
	fichier,
	feuille,
      })
    });

    log("📡 Request sent");

    const data = await res.json().catch(() => ({}));

    log("📨 Response: " + JSON.stringify(data));

    log(res.ok ? "✅ Upload success" : "❌ Upload failed");

  } catch (e) {
    log("❌ Error: " + e.message);
  }
}
export async function saveDessins(canvasID, fichier, feuille) {
  try {
    log("📸 Taking photo...");

    const canvas = document.getElementById(canvasID);

    const image = canvas.toDataURL("image/png");

    log("📦 Image captured (size: " + image.length + ")");

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "photo",
        image: image,
        timestamp: Date.now(),
	fichier,
	feuille,
      })
    });

    log("📡 Request sent");

    const data = await res.json().catch(() => ({}));

    log("📨 Response: " + JSON.stringify(data));

    log(res.ok ? "✅ Upload success" : "❌ Upload failed");

  } catch (e) {
    log("❌ Error: " + e.message);
  }
}
