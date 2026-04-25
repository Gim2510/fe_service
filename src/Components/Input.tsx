export function Input({label, value, onChange, theme}: { label: string; value: string; onChange: (v: string) => void; theme: string}) {
    const isDark = theme === 'dark';
    return (
        <div>
            <label className={`block mb-2 text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-600"}`}>{label}</label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full rounded-xl border px-4 py-3 active:ring-0 outline-none text-sm transition-colors ${isDark ? "bg-[#060D1B] text-slate-200 border-blue-900/30 focus:border-blue-600" : "bg-white text-slate-900 border-slate-200 focus:border-blue-500"}`}
            />
        </div>
    );
}