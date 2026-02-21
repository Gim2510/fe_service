export function DetailItem({label,value}: { label: string; value?: number; }) {
    return (
        <div className="flex justify-between items-center py-3 border-b border-white/[0.05] last:border-none">
            <span className="text-neutral-400 tracking-wide">{label}</span>
            <span className="text-lg font-medium">{value ?? "-"}</span>
        </div>
    );
}