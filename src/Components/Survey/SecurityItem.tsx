import {type ReactNode, useState} from "react";

function SecurityItem({title, children}: { title: string, children: ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-neutral-700/30 pb-4 cursor-pointer">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center text-left cursor-pointer"
            >
                <span className="font-medium cursor-pointer">{title}</span>
                <span className="text-sm opacity-60 cursor-pointer">{open ? "−" : "+"}</span>
            </button>

            {open && (
                <div className="mt-3 text-sm opacity-80 leading-relaxed space-y-2 cursor-pointer">
                    {children}
                </div>
            )}
        </div>
    );
}

export default SecurityItem;