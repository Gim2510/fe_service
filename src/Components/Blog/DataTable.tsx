import { useTheme } from "../../Context/ThemeContext";

export type Column = {
    header: string;
    key: string;
    align?: "left" | "center" | "right";
};

type DataTableProps = {
    columns: Column[];
    data: Record<string, string | number>[];
    caption?: string;
};

export function DataTable({ columns, data, caption }: DataTableProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="overflow-hidden rounded-xl border">
            <div className={`overflow-x-auto ${isDark ? "bg-[#0E0E0D]/80 border-stone-800/20" : "bg-white border-slate-200 shadow-sm"}`}>
                <table className="w-full text-sm border-collapse">
                    {caption && (
                        <caption className={`px-5 py-3 text-left text-[10px] font-mono uppercase tracking-[0.2em] ${isDark ? "text-slate-600 bg-[#0E0E0D]" : "text-slate-400 bg-slate-50/50"}`}>
                            {caption}
                        </caption>
                    )}
                    <thead>
                        <tr className={`border-b ${isDark ? "border-stone-800/30 bg-stone-900/30" : "border-slate-200 bg-slate-50/80"}`}>
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`px-5 py-3.5 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                                        col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"
                                    } ${isDark ? "text-slate-500" : "text-slate-500"}`}
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? "divide-stone-800/15" : "divide-slate-100"}`}>
                        {data.map((row, i) => (
                            <tr
                                key={i}
                                className={`transition-colors ${isDark ? "hover:bg-stone-800/20" : "hover:bg-slate-50/50"}`}
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className={`px-5 py-3.5 ${
                                            col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"
                                        } ${isDark ? "text-slate-300" : "text-slate-700"}`}
                                    >
                                        {row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
