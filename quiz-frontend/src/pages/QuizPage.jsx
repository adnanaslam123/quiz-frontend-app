import React, { useState, useEffect } from "react";
import QuestionCard from "../components/QuestionCard";
import ResultModal from "../components/ResultModal";
import { fetchQuestions, evaluateAnswer } from "../api/quizApi";

export default function QuizPage() {
  const [topic, setTopic] = useState("Java");
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});

  // ✅ Load questions when topic changes
  useEffect(() => {
    fetchQuestions(topic).then(data => {
      setQuestions(data);
      setIndex(0);
      setSelected(null);
      setResult(null);
    });
  }, [topic]);

  const handleSubmit = async () => {
    const res = await evaluateAnswer(questions[index].id, selected);
    setResult(res.correct);
  };

  const nextQuestion = () => {
    setResult(null);
    setSelected(null);
    setIndex((prev) => prev + 1);
  };

  if (questions.length === 0) return <p>Loading questions...</p>;
  if (index >= questions.length) return <h2>Quiz Complete!</h2>;

  return (
    <div className="quiz">
      <h1>{topic} Quiz</h1>

      {/* ✅ Topic Selector */}
      <label htmlFor="topic">Select Topic: </label>
      <select
        id="topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="mb-4"
      >
        <option value="Java">Java</option>
        <option value="Python">Python</option>
        <option value="C++">C++</option>
        <option value="SQL">SQL</option>
      </select>

      <QuestionCard
        question={questions[index]}
        selected={selected}
        onSelect={setSelected}
      />

      <button onClick={handleSubmit} disabled={!selected}>
        Submit
      </button>

      <ResultModal
        visible={result !== null}
        correct={result}
        onClose={nextQuestion}
      />
    </div>
  );
}
