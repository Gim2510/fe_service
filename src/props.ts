import type {Question} from "./types.ts";

export type PropsSurveyQuestion = {
    question: Question
    lang: "it" | "en"
    answer: any
    setAnswer: (v: any) => void
}


export type PropsMultipleChoiceQuestion = {
    options: string[]
    answer: string | null
    onChange: (value: string) => void
}


export type PropsBooleanQuestion = {
    answer: boolean | null
    onChange: (value: boolean) => void
}



export type PropsScaleQuestion = {
    min?: number
    max?: number
    answer: number | null
    onChange: (value: number) => void
}


export type PropsTextQuestion = {
    answer: string | null
    onChange: (value: string) => void
}

