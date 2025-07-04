const BASE_URL = "http://localhost:8080/api/quiz";

export async function fetchQuestions(topic) {
  const encodedTopic = encodeURIComponent(topic); // ✅ Properly encode special characters like +
  const res = await fetch(`${BASE_URL}/questions?topic=${encodedTopic}`);
  return res.json();
}

export async function evaluateAnswer(questionId, answer) {
  const res = await fetch(`${BASE_URL}/evaluate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionId, answer }),
  });
  return res.json();
}
