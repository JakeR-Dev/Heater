export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  const pathParts = req.query.path || [];
  const path = Array.isArray(pathParts) ? pathParts.join("/") : pathParts;

  const queryString = new URLSearchParams(req.query);
  queryString.delete("path");

  const upstreamUrl =
    "https://api-web.nhle.com/" + path + (queryString.toString() ? "?" + queryString.toString() : "");

  try {
    const upstream = await fetch(upstreamUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const body = await upstream.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Content-Type", upstream.headers.get("content-type") || "application/json");

    return res.status(upstream.status).send(body);
  } catch (error) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(502).json({ error: "Proxy request failed" });
  }
}
