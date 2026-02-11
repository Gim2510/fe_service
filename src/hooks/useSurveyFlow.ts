import type {Question} from "../types.ts";
import {useState} from "react";
import {useAuth} from "../auth/AuthContext.tsx";

export function useSurveyFlow(questions: Question[]) {
    const [step, setStep] = useState<number>(0);
    const [answer, setAnswer] = useState<any>(null);
    const [animating, setAnimating] = useState(false);
    const { token } = useAuth();

    const question = questions[step];
    const isLast = step === questions.length - 1;
    const canProceed = answer !== null && answer !== "";

    async function next(surveyId: string) {
        if (!canProceed || animating) return;

        setAnimating(true);

        await fetch(`${import.meta.env.VITE_SURVEY_BASE_URL}/v1/survey/save/${surveyId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                question_id: question.id,
                answer: {
                    value: answer,
                    filled: true,
                },
            }),
        });

        setTimeout(() => {
            setAnswer(null);
            setStep(s => s + 1);
            setAnimating(false);
        }, 300);
    }

    function nextStep() {
        setStep(s => s + 1);
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
        nextStep, // <-- esposto per avanzamenti speciali
    };
}
