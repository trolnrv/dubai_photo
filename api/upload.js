export default async function handler(req, res) {
  console.log("REQ RECEIVED");
  const scriptURL = "https://script.google.com/macros/s/AKfycbwDhGqqkXwn7ynCAUaUPb-PL35VOw93W7gTuekRDTUeTRxUWOACftg9NSH20JgC_OfyZw/exec";
	// Papa: https://script.google.com/macros/s/AKfycbxIuNF-bBtgZHiCE8b59ZmA3b-3cpYIt3IS4aIhL3w04PXRfpzZYEVQPzP21S9pPrQZ/exec

  if (req.body.type == "photo"){
	  try {
	    const { type, image, timestamp, fichier, feuille } = req.body;

	    console.log("IMAGE SIZE:", image?.length);

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

	    console.log("APPS SCRIPT RESPONSE:", text);

	    return res.status(200).json({
	      ok: true,
	      fromGoogle: text
	    });

	  } catch (e) {
	    console.error("ERROR:", e);

	    return res.status(500).json({
	      ok: false,
	      error: e.message
	    });
	  }
  }
  if (req.body.type == "MAJfichier"){
	  try {
	    const { type, nom } = req.body;

	    const response = await fetch(
		scriptURL,
		    {
		method: "POST",
		headers: {
		  "Content-Type": "application/json"
		},
		body: JSON.stringify({ type, nom })
	      }
	    );

	    const text = await response.text();

	    console.log("APPS SCRIPT RESPONSE:", text);

	    return res.status(200).json({
	      ok: true,
	      fromGoogle: text
	    });

	  } catch (e) {
	    console.error("ERROR:", e);

	    return res.status(500).json({
	      ok: false,
	      error: e.message
	    });
	  }
  }
  if (req.body.type == "MAJfeuille"){
	  try {
	    const { type, nom } = req.body;

	    const response = await fetch(
		scriptURL,
		    {
		method: "POST",
		headers: {
		  "Content-Type": "application/json"
		},
		body: JSON.stringify({ type, nom })
	      }
	    );

	    const text = await response.text();

	    console.log("APPS SCRIPT RESPONSE:", text);

	    return res.status(200).json({
	      ok: true,
	      fromGoogle: text
	    });

	  } catch (e) {
	    console.error("ERROR:", e);

	    return res.status(500).json({
	      ok: false,
	      error: e.message
	    });
	  }
  }
  if (req.body.type == "upload"){
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

	    console.log("APPS SCRIPT RESPONSE:", text);

	    return res.status(200).json({
	      ok: true,
	      fromGoogle: text
	    });

	  } catch (e) {
	    console.error("ERROR:", e);

	    return res.status(500).json({
	      ok: false,
	      error: e.message
	    });
	  }
  }
	if (req.body.type == "download"){
		try {
			const response = await fetch(
				scriptURL,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ type: "download", key: "tout" })
				}
			);
			const data = await response.json(); // 👈 parse direct

			console.log("APPS SCRIPT RESPONSE:", data);

			return res.status(200).json(data); // 👈 juste la data

		} catch (e) {
			console.error("ERROR:", e);

			return res.status(500).json({
				ok: false,
				error: e.message
			});
		}
	}
}
