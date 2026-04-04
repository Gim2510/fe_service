export function MetricRow({ label, value }: { label: string; value: any }) {
    return (
        <div className="flex justify-between text-sm py-1">
            <span className="opacity-70">{label}</span>
            <span className="font-semibold">{value}</span>
        </div>
    );
}