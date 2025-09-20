import React from "react";
import { Button, Stack, Typography, Card, CardContent } from "@mui/material";
import UrlRow from "../components/UrlRow.jsx";
import ResultCard from "../components/ResultCard.jsx";
import { mockShorten } from "../lib/mockApi.js";
import { isValidMinutes, isValidShortcode, isValidUrl } from "../lib/validation.js";

const LOCAL_KEY = "url-store";

export default function Shortener() {
  const [rows, setRows] = React.useState([{ url: "", minutes: "", shortcode: "" }]);
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState(() => JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]"));

  const onChange = (i, next) => setRows(r => r.map((x, idx) => idx === i ? next : x));
  const addRow = () => rows.length < 5 && setRows(r => [...r, { url: "", minutes: "", shortcode: "" }]);
  const removeRow = (i) => setRows(r => r.filter((_, idx) => idx !== i));

  const validRow = (r) => r.url && isValidUrl(r.url) && isValidMinutes(r.minutes) && isValidShortcode(r.shortcode);

  const ensureDefaults = (r) => ({
    url: r.url.trim(),
    minutes: r.minutes === "" || r.minutes == null ? 30 : Number(r.minutes),
    shortcode: r.shortcode?.trim() || undefined,
  });

  const hasCollision = (code) =>
    results.some((x) => x.shortPath === code && (!x.expiresAt || new Date(x.expiresAt) > new Date()));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!rows.every(validRow)) return;

    const withDefaults = rows.map(ensureDefaults);
    const conflicted = withDefaults.find((r) => r.shortcode && hasCollision(r.shortcode));
    if (conflicted) {
      const idx = withDefaults.indexOf(conflicted);
      setRows(prev => prev.map((r, i) => i === idx ? { ...r, error: "Shortcode already exists. Choose another." } : r));
      return;
    }

    setLoading(true);
    try {
      const out = await mockShorten(withDefaults);
      const merged = [...out, ...results].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setResults(merged);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(merged));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="body1">Shorten up to 5 URLs; default validity is 30 minutes if not provided.</Typography>
      <form onSubmit={onSubmit}>
        <Stack spacing={1.5}>
          {rows.map((r, i) => (
            <UrlRow key={i} index={i} value={r} onChange={onChange} onRemove={removeRow} disabled={loading} />
          ))}
          <Stack direction="row" spacing={1.5}>
            <Button type="button" onClick={addRow} disabled={loading || rows.length >= 5} variant="outlined">Add URL</Button>
            <div style={{ flex: 1 }} />
            <Button type="submit" disabled={!rows.every(validRow) || loading} variant="contained">
              {loading ? "Creating..." : "Create short links"}
            </Button>
          </Stack>
        </Stack>
      </form>

      {results.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Results</Typography>
            <Stack spacing={1.5}>
              {results.map((item, i) => <ResultCard key={i} item={item} />)}
            </Stack>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
