export function Input({
                   label,
                   value,
                   onChange,
               }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div>
            <label className="block text-neutral-400 mb-2">{label}</label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 text-white"
            />
        </div>
    );
}