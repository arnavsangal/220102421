import React from "react";
import { Card, CardContent, Typography, Link, Stack } from "@mui/material";

export default function ResultCard({ item }) {
  const { originalUrl, shortUrl, createdAt, expiresAt } = item;
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="caption" color="text.secondary">Original</Typography>
        <Typography sx={{ wordBreak: "break-all" }}>{originalUrl}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>Short</Typography>
        <Typography><Link href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</Link></Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Typography variant="caption">Created: {new Date(createdAt).toLocaleString()}</Typography>
          <Typography variant="caption">Expiry: {expiresAt ? new Date(expiresAt).toLocaleString() : "None"}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
