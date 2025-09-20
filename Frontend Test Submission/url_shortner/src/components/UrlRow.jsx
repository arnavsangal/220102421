import React from "react";
import { TextField, Button, Stack, Alert } from "@mui/material";
import { isValidMinutes, isValidShortcode, isValidUrl } from "../lib/validation.js";

export default function UrlRow({ index, value, onChange, onRemove, disabled }) {
  const { url, minutes, shortcode, error } = value;
  const urlErr = url ? (isValidUrl(url) ? "" : "Enter a valid http(s) URL") : "URL is required";
  const minErr = isValidMinutes(minutes) ? "" : "Validity must be a positive integer (minutes)";
  const scErr = isValidShortcode(shortcode) ? "" : "3-20 chars: letters, numbers, - or _";

  return (
    <Stack spacing={1.5} sx={{ p: 1.5, border: "1px solid #e0e0e0", borderRadius: 2 }}>
      <Stack direction="row" spacing={1.5}>
        <TextField
          fullWidth size="small" label="Original URL"
          placeholder="https://example.com/very/long/url"
          value={url} onChange={(e)=>onChange(index,{...value,url:e.target.value})}
          error={!!urlErr} helperText={urlErr || " "} disabled={disabled}
        />
        <Button onClick={()=>onRemove(index)} disabled={disabled} variant="outlined">Remove</Button>
      </Stack>
      <Stack direction="row" spacing={1.5}>
        <TextField
          size="small" label="Validity (minutes, optional)" type="number"
          value={minutes ?? ""} onChange={(e)=>onChange(index,{...value, minutes:e.target.value===""?"":Number(e.target.value)})}
          error={!!minErr} helperText={minErr || " "} disabled={disabled} sx={{ flex:1 }}
        />
        <TextField
          size="small" label="Preferred shortcode (optional)"
          value={shortcode ?? ""} onChange={(e)=>onChange(index,{...value, shortcode:e.target.value})}
          error={!!scErr} helperText={scErr || " "} disabled={disabled} sx={{ flex:1 }}
        />
      </Stack>
      {error ? <Alert severity="error">{error}</Alert> : null}
    </Stack>
  );
}
