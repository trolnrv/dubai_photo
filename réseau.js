export async function upload(content) {
	console.log("réseau || On upload.");

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

	console.log("réseau || 📨 Response: " + JSON.stringify(data));
	return data;
}

export async function download() {
	console.log("réseau || On download.");

	const res = await fetch("/api/upload", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			type: "download",
		})
	});

	const data = await res.json().catch(() => ({}));

	console.log("réseau || 📨 Response: " + JSON.stringify(data));
	return data;
}

export async function refresh() {
	console.log("réseau || On refresh.");

	const res = await fetch("/api/upload", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			type: "refresh",
		})
	});

	const data = await res.json().catch(() => ({}));

	console.log("réseau || 📨 Response: " + JSON.stringify(data));
	return data;
}

export async function rienupload(content) {
	console.log("réseau || On rienupload.");

	const res = await fetch("/api/upload", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			type: "rienupload",
			content: content,
		})
	});

	const data = await res.json().catch(() => ({}));

	console.log("réseau || 📨 Response: " + JSON.stringify(data));
	return data;
}
export async function riendownload() {
	console.log("réseau || On riendownload.");

	const res = await fetch("/api/upload", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			type: "riendownload",
		})
	});

	const data = await res.json().catch(() => ({}));

	console.log("réseau || 📨 Response: " + JSON.stringify(data));
	return data;
}
