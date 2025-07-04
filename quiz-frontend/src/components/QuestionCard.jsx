import React from "react";

export default function QuestionCard({ question, selected, onSelect }) {
  return (
    <div className="card">
      <h2>{question.questionText}</h2>
      <ul>
        {["A", "B", "C", "D"].map((opt) => (
          <li key={opt}>
            <label>
              <input
                type="radio"
                name={`q-${question.id}`}
                value={opt}
                checked={selected === opt}
                onChange={() => onSelect(opt)}
              />
              {question[`option${opt}`]}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
