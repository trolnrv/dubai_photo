import { log } from "./utils.js";

export async function refresh(content) {
  log("réseau || On refresh.");

  const res = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: "refresh",
      content: content,
    })
  });

  const data = await res.json().catch(() => ({}));

  log("réseau || 📨 Response: " + JSON.stringify(data));
  return data;
}
export async function upload(content) {
  log("réseau || On upload.");

  const res = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: "upload",
      content: content,
    })
  });

  const data = await res.json().catch(() => ({}));

  log("réseau || 📨 Response: " + JSON.stringify(data));
  return data;
}

export async function download() {
  log("réseau || On download.");

  const res = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: "download"
    })
  });

  const data = await res.json().catch(() => ({}));

  log("réseau || 📨 Response: " + JSON.stringify(data));
  return data;
}
