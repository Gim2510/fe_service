import type { PropsSurveyQuestion } from "../props"

import { MultipleChoiceQuestion } from "./SurveyQuestion/MultipleChoiceQuestion"
import { BooleanQuestion } from "./SurveyQuestion/BooleanQuestion"
import { ScaleQuestion } from "./SurveyQuestion/ScaleQuestion"
import { TextQuestion } from "./SurveyQuestion/TextQuestion"

export function SurveyQuestion({question, lang, answer, setAnswer, theme}: PropsSurveyQuestion) {
    switch (question.type) {
        case "multipleChoice":
            return (
                <MultipleChoiceQuestion
                    options={question.opt?.[lang] ?? []}
                    answer={answer}
                    onChange={setAnswer}
                    variant={theme}
                />
            )

        case "boolean":
            return (
                <BooleanQuestion
                    answer={answer}
                    onChange={setAnswer}
                />
            )

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
            return (
                <TextQuestion
                    answer={answer}
                    onChange={setAnswer}
                />
            )

        default:
            return null
    }
}