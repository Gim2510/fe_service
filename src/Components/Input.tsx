export function Input({label, value, onChange, theme}: { label: string; value: string; onChange: (v: string) => void; theme: string}) {
    const isDark = theme === 'dark';
    return (
        <div>
            <label className="block text-neutral-400 mb-2">{label}</label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full rounded-xl border px-4 py-3 active:ring-0 outline-none ${isDark ? "bg-neutral-900 text-white border-neutral-800" : "bg-indigo-50 text-black border-black/30"}`}
            />
        </div>
    );
}