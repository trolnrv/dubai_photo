export default async function handler(req, res) {
	console.log("upload || REQ RECEIVED");
	const scriptURL = "https://script.google.com/macros/s/AKfycbwQDFIgdB9uQxRfAnJVBQqEqakt7iMLkvcpiGy4Hpj99r2UhcFS3RhDIgwYLTWEG4qZTw/exec";
	// Papa: https://script.google.com/macros/s/AKfycbxIuNF-bBtgZHiCE8b59ZmA3b-3cpYIt3IS4aIhL3w04PXRfpzZYEVQPzP21S9pPrQZ/exec

	const type = req.body.type;
	if (type == "photo"){
		try {
			const { image, timestamp, fichier, feuille } = req.body;

			console.log("upload || IMAGE SIZE:", image?.length);

			const response = await fetch(
				scriptURL,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ type, image, timestamp, fichier, feuille })
				}
			);

			const text = await response.text();

			console.log("upload || APPS SCRIPT RESPONSE:", text);

			return res.status(200).json({
				ok: true,
				fromGoogle: text
			});

		} catch (e) {
			console.error("upload || ERROR:", e);

			return res.status(500).json({
				ok: false,
				error: e.message
			});
		}
	}
	if (type == "upload"){
		try {
			const response = await fetch(
				scriptURL,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ type: "upload", key: "tout", content: req.body.content, })
				}
			);

			const text = await response.text();

			console.log("upload || APPS SCRIPT RESPONSE:", text);

			return res.status(200).json({
				ok: true,
				fromGoogle: text
			});

		} catch (e) {
			console.error("upload || ERROR:", e);

			return res.status(500).json({
				ok: false,
				error: e.message
			});
		}
	}
	if (type == "download" || type == "refresh"){
		try {
			console.log("upload || ON ENVOIE");
			const response = await fetch(
				scriptURL,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({type: type, key: "tout",})
				}
			);

			const data = await response.json(); // 👈 parse direct

			console.log("upload || APPS SCRIPT RESPONSE:", data);

			return res.status(200).json(data); // 👈 juste la data

		} catch (e) {
			console.error("upload || ERROR:", e);

			return res.status(500).json({
				ok: false,
				error: e.message
			});
		}
	}
	if (type == "rienupload"){
		try {
			const response = await fetch(
				scriptURL,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ type: "upload", key: "rien", content: req.body.content, })
				}
			);

			const text = await response.text();

			console.log("upload || APPS SCRIPT RESPONSE:", text);

			return res.status(200).json({
				ok: true,
				fromGoogle: text
			});

		} catch (e) {
			console.error("upload || ERROR:", e);

			return res.status(500).json({
				ok: false,
				error: e.message
			});
		}
	}
	if (type == "riendownload"){
		try {
			console.log("upload || ON ENVOIE");
			const response = await fetch(
				scriptURL,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({type: "download", key: "rien",})
				}
			);

			const data = await response.json(); // 👈 parse direct

			console.log("upload || APPS SCRIPT RESPONSE:", data);

			return res.status(200).json(data); // 👈 juste la data

		} catch (e) {
			console.error("upload || ERROR:", e);

			return res.status(500).json({
				ok: false,
				error: e.message
			});
		}
	}
}
