export function formatAnswer(value: any): string {
    if (value == null) return "—";

    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }

    if (Array.isArray(value)) {
        return value.map(formatAnswer).join(", ");
    }

    if (typeof value === "object") {
        // caso più comune: option / label
        if ("label" in value) {
            return String(value.label);
        }

        if ("value" in value) {
            return String(value.value);
        }

        // fallback leggibile
        return JSON.stringify(value, null, 2);
    }

    return String(value);
}