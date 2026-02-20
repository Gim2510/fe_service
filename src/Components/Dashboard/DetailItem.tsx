export function DetailItem({label, value,}: { label: string; value?: number; }) {
    return (
        <div className="flex justify-between">
            <span className="text-neutral-400">{label}</span>
            <span>{value ?? "-"}</span>
        </div>
    );
}
