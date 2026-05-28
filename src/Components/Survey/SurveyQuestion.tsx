import type { PropsSurveyQuestion } from "../../props.ts"

import { MultipleChoiceQuestion } from "./SurveyQuestion/MultipleChoiceQuestion.tsx"
import { BooleanQuestion } from "./SurveyQuestion/BooleanQuestion.tsx"
import { ScaleQuestion } from "./SurveyQuestion/ScaleQuestion.tsx"
import { TextQuestion } from "./SurveyQuestion/TextQuestion.tsx"

export function SurveyQuestion({ question, lang, answer, setAnswer, theme, onAutoSelect }: PropsSurveyQuestion) {
    const isDark = theme === "dark"

    let content: React.ReactNode = null

    switch (question.type) {
        case "multipleChoice":
            content = (
                <MultipleChoiceQuestion
                    options={question.opt?.[lang] ?? []}
                    descriptions={question.desc?.[lang]}
                    answer={answer}
                    onChange={setAnswer}
                    isDark={isDark}
                    onAutoSelect={onAutoSelect}
                />
            )
            break

        case "boolean":
            content = (
                <BooleanQuestion
                    answer={answer}
                    onChange={setAnswer}
                    isDark={isDark}
                    onAutoSelect={onAutoSelect}
                />
            )
            break

        case "scale":
            content = (
                <ScaleQuestion
                    min={question.min}
                    max={question.max}
                    answer={answer}
                    onChange={setAnswer}
                    isDark={isDark}
                    onAutoSelect={onAutoSelect}
                />
            )
            break

        case "text":
            content = (
                <TextQuestion
                    answer={answer}
                    onChange={setAnswer}
                    isDark={isDark}
                />
            )
            break

        default:
            return null
    }

    return <div className="pt-3 pb-4">{content}</div>
}
