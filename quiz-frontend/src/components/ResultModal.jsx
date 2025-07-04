import React from "react";

export default function ResultModal({ visible, correct, onClose }) {
  if (!visible) return null;

  return (
    <div className="modal">
      <h3>{correct ? "✅ Correct!" : "❌ Wrong Answer"}</h3>
      <button onClick={onClose}>Next Question</button>
    </div>
  );
}
