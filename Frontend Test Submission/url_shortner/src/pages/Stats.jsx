import React from "react";
import { Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { mockClicksFor } from "../lib/mockApi.js";

export default function Stats() {
  const [items] = React.useState(() => JSON.parse(localStorage.getItem("url-store") || "[]"));
  const [selected, setSelected] = React.useState(null);
  const [clicks, setClicks] = React.useState([]);

  const loadClicks = (path) => {
    setClicks(mockClicksFor(path));
    setSelected(path);
  };

  return (
    <Stack spacing={2}>
      <Typography>View shortened URLs with total clicks and click details.</Typography>

      <Stack spacing={1.5}>
        {items.map((it, i) => {
          const c = mockClicksFor(it.shortPath);
          return (
            <Card key={i} variant="outlined">
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <div>
                    <Typography variant="body2" color="text.secondary">{it.shortUrl}</Typography>
                    <Typography sx={{ wordBreak: "break-all" }}>{it.originalUrl}</Typography>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Typography variant="body2">Total clicks</Typography>
                    <Typography variant="h5">{c.length}</Typography>
                  </div>
                </Stack>
                <Button sx={{ mt: 1 }} onClick={() => loadClicks(it.shortPath)} variant="outlined">View details</Button>
              </CardContent>
            </Card>
          );
        })}
      </Stack>

      {selected && (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>Click details for {selected}</Typography>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Timestamp</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Source</th>
                    <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Geo</th>
                  </tr>
                </thead>
                <tbody>
                  {clicks.map((c, idx) => (
                    <tr key={idx}>
                      <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>{new Date(c.timestamp).toLocaleString()}</td>
                      <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>{c.source}</td>
                      <td style={{ borderBottom: "1px solid #f0f0f0", padding: 8 }}>{c.geo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
