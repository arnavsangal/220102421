import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Redirector() {
  const { code } = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    const store = JSON.parse(localStorage.getItem("url-store") || "[]");
    const entry = store.find((x) => x.shortPath === code);
    if (!entry) { navigate("/", { replace: true }); return; }
    const now = new Date();
    if (entry.expiresAt && new Date(entry.expiresAt) < now) {
      alert("This link has expired.");
      navigate("/", { replace: true });
      return;
    }
    window.location.href = entry.originalUrl;
  }, [code, navigate]);
  return <div>Redirecting...</div>;
}
