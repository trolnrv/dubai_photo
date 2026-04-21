export default async function handler(req, res) {
  console.log("REQ RECEIVED");

  try {
    const { image, timestamp } = req.body;

    console.log("IMAGE SIZE:", image?.length);

    await fetch("https://script.google.com/macros/s/AKfycbwkOAeFKv_aQIo_LmHMJaky3FRq2qzlVsQn_KAyBTfhBXnRJz1Up0l7-_3eZNDMgGOa/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ image, timestamp })
    });

    console.log("FORWARDED");

    res.status(200).json({ ok: true });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}
