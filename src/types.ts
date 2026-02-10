export type QuestionType =
    | "multipleChoice"
    | "scale"
    | "boolean"
    | "text"

export type Question = {
    id: string
    text: { it: string; en: string }
    type: QuestionType
    opt?: { it: string[]; en: string[] }
    min?: number
    max?: number
}
