import { useTheme } from "../../Context/ThemeContext";
import { DataTable } from "./DataTable";
import type { Column } from "./DataTable";
import type { ReactNode } from "react";

type MarkdownTableProps = {
    children: ReactNode;
};

// Helper to extract text from React nodes (handles bold, italic, etc. inside table cells)
const extractText = (node: ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (typeof node === 'object' && node !== null && 'props' in node) {
        return extractText((node as any).props.children);
    }
    return '';
};

export function MarkdownTable({ children }: MarkdownTableProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Parse markdown table structure from children
    const rows: ReactNode[][] = [];
    let headers: string[] = [];

    const extractTableData = (node: ReactNode) => {
        if (!node) return;
        
        if (Array.isArray(node)) {
            node.forEach(extractTableData);
            return;
        }

        if (typeof node === 'object' && node !== null && 'props' in node) {
            const { children: childContent } = (node as any).props;
            
            if ((node as any).type === 'th') {
                headers.push(extractText(childContent).trim());
            } else if ((node as any).type === 'tr') {
                const cells: string[] = [];
                const extractCells = (n: ReactNode) => {
                    if (!n) return;
                    if (Array.isArray(n)) {
                        n.forEach(extractCells);
                        return;
                    }
                    if (typeof n === 'object' && n !== null && 'props' in n) {
                        const { children: cellContent } = (n as any).props;
                        if ((n as any).type === 'th') {
                            headers.push(extractText(cellContent).trim());
                        } else if ((n as any).type === 'td') {
                            cells.push(extractText(cellContent).trim());
                        } else {
                            extractCells(cellContent);
                        }
                    }
                };
                extractCells(childContent);
                if (cells.length > 0) rows.push(cells);
            } else {
                extractTableData(childContent);
            }
        }
    };

    extractTableData(children);

    if (headers.length === 0 && rows.length === 0) {
        return (
            <div className={`my-6 overflow-x-auto rounded-lg border ${isDark ? "border-stone-800/20" : "border-slate-200"}`}>
                <table className="w-full text-sm">
                    {children}
                </table>
            </div>
        );
    }

    const columns: Column[] = headers.map((h, i) => ({
        header: h,
        key: `col_${i}`,
        align: i === 0 ? "left" : "center"
    }));

    const data = rows.map((row) => {
        const obj: Record<string, string> = {};
        row.forEach((cell, i) => {
            obj[`col_${i}`] = String(cell);
        });
        return obj;
    });

    return <DataTable columns={columns} data={data} />;
}
