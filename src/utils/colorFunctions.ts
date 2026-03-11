export function getStrengthColor(score: number) {
    switch (score) {
        case 0:
            return "bg-red-500"
        case 1:
            return "bg-orange-500"
        case 2:
            return "bg-yellow-500"
        case 3:
            return "bg-lime-500"
        case 4:
            return "bg-green-500"
        default:
            return "bg-neutral-500"
    }
}

export function getStrengthText(score: number) {
    switch (score) {
        case 0:
            return "Molto debole"
        case 1:
            return "Debole"
        case 2:
            return "Accettabile"
        case 3:
            return "Buona"
        case 4:
            return "Forte"
        default:
            return ""
    }
}