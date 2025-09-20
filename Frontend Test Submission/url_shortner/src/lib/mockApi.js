// Simulated backend; replace with real API later.
export async function mockShorten(batch) {
  await new Promise(r => setTimeout(r, 300));
  const now = new Date();
  return batch.map(item => {
    const sc = item.shortcode || Math.random().toString(36).slice(2, 8);
    const createdAt = now.toISOString();
    const expiresAt = item.minutes ? new Date(now.getTime() + item.minutes * 60000).toISOString() : null;
    return {
      originalUrl: item.url,
      shortPath: sc,
      shortUrl: `${location.origin}/${sc}`,
      createdAt, expiresAt
    };
  });
}

const SOURCES = ["direct","web","social","email","qr"];
const GEOS = ["Hyderabad, IN","Bengaluru, IN","Delhi, IN","Pune, IN","Chennai, IN","Kolkata, IN"];
export function mockClicksFor(code) {
  const seed = code.split("").reduce((a,c)=>a+c.charCodeAt(0),0);
  const n = (seed % 10) + 3, now = Date.now();
  const arr = Array.from({length:n}).map((_,i)=>({
    timestamp: new Date(now - (i+1)*3600_000 * ((seed%6)+1)).toISOString(),
    source: SOURCES[(seed+i)%SOURCES.length],
    geo: GEOS[(seed+i*2)%GEOS.length]
  }));
  return arr.sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp));
}
