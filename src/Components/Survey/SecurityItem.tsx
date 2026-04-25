import { type ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

function SecurityItem({ title, children }: { title: string; children: ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-blue-900/20 pb-4">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center text-left gap-4 cursor-pointer"
            >
                <span className="text-sm font-medium">{title}</span>
                <ChevronDown
                    size={15}
                    className={`shrink-0 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>
            {open && (
                <div className="mt-3 text-sm text-slate-500 leading-relaxed">
                    {children}
                </div>
            )}
        </div>
    );
}

export default SecurityItem;