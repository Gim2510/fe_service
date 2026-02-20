export function DashboardCard({title, value,}: { title: string; value?: number | string; }) {
    return (
        <div className="rounded-3xl border border-neutral-700 bg-neutral-900/70 p-6 backdrop-blur hover:scale-105 transition">
            <p className="text-neutral-400 text-sm">{title}</p>
            <p className="text-3xl font-semibold mt-2">{value ?? "-"}</p>
        </div>
    );
}
