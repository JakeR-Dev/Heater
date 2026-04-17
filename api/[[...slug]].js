export default async function handler(req, res) {
  // Set CORS headers on all responses
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname.replace(/^\/api\//, "");
  const queryString = url.search;

  const upstreamUrl = "https://api-web.nhle.com/" + path + queryString;

  try {
    const upstream = await fetch(upstreamUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const body = await upstream.text();

    res.setHeader("Content-Type", upstream.headers.get("content-type") || "application/json");
    return res.status(upstream.status).end(body);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(502).end(JSON.stringify({ error: "Proxy request failed" }));
  }
}
