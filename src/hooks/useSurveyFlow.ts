import { useState, useEffect, useRef } from "react";
import type { Question } from "../types.ts";
import { useAuth } from "../auth/AuthContext.tsx";

export function useSurveyFlow(
    questions: Question[],
    initialStep = 0,
    initialAnswer: any = null,
    savedAnswers: Record<string, any> = {},
) {
    const [step, setStep] = useState<number>(0);
    const [answer, setAnswer] = useState<any>(null);
    const [animating, setAnimating] = useState(false);

    // Local cache: questionId → answer value (populated from DB + updated on each next())
    const cache = useRef<Record<string, any>>({});

    const { token } = useAuth();

    // Apply resume position + seed cache from DB answers — runs once when data arrives
    const applied = useRef(false);
    useEffect(() => {
        if (applied.current) return;
        if (questions.length === 0) return;
        applied.current = true;

        // Seed cache with all previously saved answers
        cache.current = { ...savedAnswers };

        if (initialStep > 0) setStep(initialStep);
        if (initialAnswer !== null) setAnswer(initialAnswer);
    }, [questions.length, initialStep, initialAnswer, savedAnswers]);

    const question = questions[step];
    const isLast = step === questions.length - 1;
    const canProceed = answer !== null && answer !== "" &&
        !(Array.isArray(answer) && answer.length === 0);

    async function next(surveyId: string) {
        if (!canProceed || animating) return;

        setAnimating(true);

        // Save to local cache before advancing
        if (question) cache.current[question.id] = answer;

        await fetch(`${import.meta.env.VITE_SURVEY_BASE_URL}/v1/survey/save/${surveyId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                question_id: question.id,
                answer: { value: answer, filled: true },
            }),
        });

        setTimeout(() => {
            setStep(s => {
                const next = s + 1;
                // Pre-fill answer for the next step if already cached
                const nextQ = questions[next];
                setAnswer(nextQ ? (cache.current[nextQ.id] ?? null) : null);
                return next;
            });
            setAnimating(false);
        }, 300);
    }

    async function skip(surveyId: string) {
        if (animating || !question) return;
        setAnimating(true);
        cache.current[question.id] = null;
        await fetch(`${import.meta.env.VITE_SURVEY_BASE_URL}/v1/survey/save/${surveyId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                question_id: question.id,
                answer: { value: null, filled: true },
            }),
        });
        setTimeout(() => {
            setStep(s => {
                const next = s + 1;
                const nextQ = questions[next];
                setAnswer(nextQ ? (cache.current[nextQ.id] ?? null) : null);
                return next;
            });
            setAnimating(false);
        }, 300);
    }

    function nextStep() {
        setStep(s => s + 1);
    }

    function prev() {
        if (animating || step === 0) return;
        setStep(s => {
            const prev = s - 1;
            const prevQ = questions[prev];
            setAnswer(prevQ ? (cache.current[prevQ.id] ?? null) : null);
            return prev;
        });
    }

    return {
        step,
        question,
        isLast,
        answer,
        setAnswer,
        animating,
        canProceed,
        next,
        skip,
        nextStep,
        prev,
    };
}
