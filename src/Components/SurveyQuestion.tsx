import {MultipleChoiceQuestion} from "./SurveyQuestion/MultipleChoiceQuestion.tsx";
import type {PropsSurveyQuestion} from "../props.ts";
import {BooleanQuestion} from "./SurveyQuestion/BooleanQuestion.tsx";
import {ScaleQuestion} from "./SurveyQuestion/ScaleQuestion.tsx";
import {TextQuestion} from "./SurveyQuestion/TextQuestion.tsx";

export function SurveyQuestion({
                                   question,
                                   lang,
                                   answer,
                                   setAnswer,
                               }: PropsSurveyQuestion) {
    switch (question.type) {
        case "multipleChoice":
            return (
                <MultipleChoiceQuestion
                    options={question.opt?.[lang] ?? []}
                    answer={answer}
                    onChange={setAnswer}
                />
            )

        case "boolean":
            return <BooleanQuestion answer={answer} onChange={setAnswer} />

        case "scale":
            return (
                <ScaleQuestion
                    min={question.min}
                    max={question.max}
                    answer={answer}
                    onChange={setAnswer}
                />
            )

        case "text":
            return <TextQuestion answer={answer} onChange={setAnswer} />

        default:
            return null
    }
}
