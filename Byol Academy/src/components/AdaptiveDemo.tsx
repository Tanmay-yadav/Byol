"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { demoCopy } from "@/content/site";
import { demoQuestions } from "@/content/demo-data";
import { masterySignal, updateMastery } from "@/lib/adaptive/mastery";
import { trackEvent } from "@/lib/analytics";
import { MasteryMap } from "./MasteryMap";

type DemoState = "idle" | "asking" | "feedback" | "results";

const initialEstimate = 0.5;

export function AdaptiveDemo() {
  const [subject, setSubject] = useState<string>(demoCopy.subjects[0]);
  const [state, setState] = useState<DemoState>("idle");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [estimates, setEstimates] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const resultsHeading = useRef<HTMLHeadingElement>(null);
  const startButton = useRef<HTMLButtonElement>(null);
  const previousState = useRef<DemoState>("idle");

  const questions = demoQuestions[subject] ?? demoQuestions.Medicine!;
  const question = questions[questionIndex];
  const completedConcepts = useMemo(
    () => questions.slice(0, estimates.length).map((item) => item.concept),
    [estimates.length, questions],
  );

  useEffect(() => {
    if (state === "asking" && previousState.current !== "asking") {
      questionHeading.current?.focus();
    } else if (state === "results") {
      resultsHeading.current?.focus();
    } else if (state === "idle" && previousState.current !== "idle") {
      startButton.current?.focus();
    }
    previousState.current = state;
  }, [state]);

  function startDemo() {
    setQuestionIndex(0);
    setSelected(null);
    setEstimates([]);
    setCorrectCount(0);
    setState("asking");
    trackEvent("demo_start", { subject });
  }

  function submitAnswer() {
    if (selected === null || !question) return;
    const correct = selected === question.answer;
    const estimate = updateMastery(initialEstimate, correct);
    setEstimates((previous) => [...previous, estimate]);
    setCorrectCount((previous) => previous + Number(correct));
    setState("feedback");
    trackEvent("demo_answer", {
      subject,
      questionIndex: questionIndex + 1,
      correct,
    });
  }

  function moveForward() {
    if (questionIndex === questions.length - 1) {
      setState("results");
      trackEvent("demo_complete", { subject, correctCount });
      return;
    }
    setQuestionIndex((index) => index + 1);
    setSelected(null);
    setState("asking");
  }

  function reset() {
    setState("idle");
    setQuestionIndex(0);
    setSelected(null);
    setEstimates([]);
    setCorrectCount(0);
  }

  return (
    <div className="demo-card">
      <div className="demo-card__topline">
        <span className="demo-pulse" aria-hidden="true" />
        <span>Interactive preview</span>
        <span className="demo-card__topline-right">{demoCopy.questions}</span>
      </div>
      <p className="demo-disclaimer">{demoCopy.label}</p>

      {state === "idle" && (
        <div className="demo-start">
          <div>
            <p className="eyebrow">Choose a sample</p>
            <h3>{demoCopy.title}</h3>
            <p>{demoCopy.description}</p>
            <fieldset className="subject-options">
              <legend>Choose a learning area</legend>
              {demoCopy.subjects.map((item) => (
                <label className={subject === item ? "subject-option subject-option--selected" : "subject-option"} key={item}>
                  <input
                    type="radio"
                    name="subject"
                    value={item}
                    checked={subject === item}
                    onChange={() => setSubject(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </fieldset>
            <button className="button button--primary" ref={startButton} type="button" onClick={startDemo}>
              {demoCopy.start}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
          <div className="demo-side-note" aria-hidden="true">
            <span className="demo-side-note__number">01</span>
            <p>Start with a question. Let the next step respond.</p>
            <span className="demo-side-note__line" />
          </div>
        </div>
      )}

      {(state === "asking" || state === "feedback") && question && (
        <div className="demo-question">
          <div className="demo-progress">
            <span>{demoCopy.questionLabel} {questionIndex + 1} of {questions.length}</span>
            <div
              className="demo-progress__track"
              role="progressbar"
              aria-label="Question progress"
              aria-valuemin={0}
              aria-valuemax={questions.length}
              aria-valuenow={questionIndex + 1}
            >
              <span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
            </div>
          </div>
          <p className="demo-concept">{question.concept}</p>
          <h3 ref={questionHeading} tabIndex={-1}>{question.prompt}</h3>
          <fieldset className="answer-options" disabled={state === "feedback"}>
            <legend>{demoCopy.answerPrompt}</legend>
            {question.options.map((option, index) => {
              const isCorrect = state === "feedback" && index === question.answer;
              const isWrongChoice = state === "feedback" && index === selected && index !== question.answer;
              return (
                <label
                  className={`answer-option${selected === index ? " answer-option--selected" : ""}${isCorrect ? " answer-option--correct" : ""}${isWrongChoice ? " answer-option--incorrect" : ""}`}
                  key={option}
                >
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    value={index}
                    checked={selected === index}
                    onChange={() => setSelected(index)}
                  />
                  <span className="answer-option__letter">{String.fromCharCode(65 + index)}</span>
                  <span>{option}</span>
                  {isCorrect && <span className="answer-option__status">Correct answer</span>}
                  {isWrongChoice && <span className="answer-option__status">Your answer</span>}
                </label>
              );
            })}
          </fieldset>
          {state === "feedback" ? (
            <div className="demo-feedback" role="status" aria-live="polite">
              <strong>{selected === question.answer ? demoCopy.correct : demoCopy.incorrect}</strong>
              <p>{question.explanation}</p>
            </div>
          ) : null}
          <div className="demo-actions">
            <button className="button button--quiet" type="button" onClick={reset}>
              <ArrowLeft size={16} aria-hidden="true" />
              Start over
            </button>
            {state === "asking" ? (
              <button className="button button--primary" type="button" disabled={selected === null} onClick={submitAnswer}>
                Check answer
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            ) : (
              <button className="button button--primary" type="button" onClick={moveForward}>
                {questionIndex === questions.length - 1 ? demoCopy.results : demoCopy.next}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      )}

      {state === "results" && (
        <div className="demo-results">
          <div className="demo-results__header">
            <div>
              <p className="eyebrow">Your sample is complete</p>
              <h3 ref={resultsHeading} tabIndex={-1}>{demoCopy.resultTitle}</h3>
              <p>You answered {correctCount} of {questions.length} questions correctly.</p>
            </div>
            <button className="icon-button" type="button" onClick={reset} aria-label={demoCopy.restart}>
              <RotateCcw size={18} aria-hidden="true" />
            </button>
          </div>
          <div className="demo-results__grid">
            <div className="demo-results__map">
              <MasteryMap estimates={estimates} concepts={completedConcepts} compact />
            </div>
            <div className="demo-next-step">
              <span className="demo-next-step__icon" aria-hidden="true">↗</span>
              <p className="eyebrow">{demoCopy.nextStep}</p>
              <p>{demoCopy.nextStepText}</p>
            </div>
          </div>
          <table className="demo-table">
            <caption>{demoCopy.tableCaption}</caption>
            <thead><tr>{demoCopy.tableHeaders.map((heading) => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
            <tbody>
              {completedConcepts.map((concept, index) => {
                const estimate = estimates[index] ?? initialEstimate;
                return (
                  <tr key={concept}>
                    <th scope="row">{concept}</th>
                    <td>{Math.round(estimate * 100)}%</td>
                    <td>{masterySignal(estimate)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="button button--secondary demo-restart" type="button" onClick={reset}>
            <RotateCcw size={16} aria-hidden="true" />
            {demoCopy.restart}
          </button>
        </div>
      )}
    </div>
  );
}
