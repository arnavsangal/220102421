import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Stack, Link as MLink, Container } from "@mui/material";
import Shortener from "./pages/Shortener.jsx";
import Stats from "./pages/Stats.jsx";
import Redirector from "./pages/Redirector.jsx";

const Nav = () => (
  <AppBar position="static" color="default" elevation={0}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>URL Shortener</Typography>
      <Stack direction="row" spacing={2}>
        <MLink component={NavLink} to="/" end underline="none">Shorten</MLink>
        <MLink component={NavLink} to="/stats" underline="none">Statistics</MLink>
      </Stack>
    </Toolbar>
  </AppBar>
);

export default function App() {
  return (
    <>
      <Nav />
      <Container sx={{ py: 3, maxWidth: 980 }}>
        <Routes>
          <Route path="/" element={<Shortener />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/:code" element={<Redirector />} />
        </Routes>
      </Container>
    </>
  );
}
