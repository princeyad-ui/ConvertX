import React from "react";
import "../styles/components/tool-card.css";
import { useNavigate } from "react-router-dom";

export default function ToolCard({ title ,link}) {
     const navigate = useNavigate();
  return (
    <div className="tool-card" onClick={() => navigate(link)}>
      <p>{title}</p>
    </div>
  );
}
