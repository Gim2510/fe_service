export function DetailItem({ label, value, theme }: { label: string; value?: number; theme: string }) {
    const isDark = theme === "dark";
    return (
        <div className={`flex justify-between items-center py-3 border-b ${isDark ? "border-white/10" : "border-gray-200"} last:border-none`}>
            <span className={isDark ? "text-neutral-400" : "text-gray-700"}>{label}</span>
            <span className={isDark ? "text-white" : "text-gray-900"}>{value ?? "-"}</span>
        </div>
    );
}