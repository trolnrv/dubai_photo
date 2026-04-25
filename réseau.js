import { log } from "./utils.js";
export async function upload(content) {
  log("On upload.");

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

  log("📨 Response: " + JSON.stringify(data));
  return data;
}

export async function download() {
  log("On download.");

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

  log("📨 Response: " + JSON.stringify(data));
  return data;
}
