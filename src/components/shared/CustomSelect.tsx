'use client';

import { useState, useRef, useEffect } from 'react';

interface Option {
    value: string;
    label: string;
    icon?: string;
}

interface CustomSelectProps {
    name: string;
    placeholder?: string;
    options: Option[];
}

export default function CustomSelect({ name, placeholder, options }: CustomSelectProps) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Option | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    const toggle = () => setOpen(o => !o);
    const onSelect = (opt: Option) => {
        setSelected(opt);
        setOpen(false);
    };

    // close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, []);

    return (
        <div className="relative" ref={ref}>
            <input type="hidden" name={name} value={selected?.value || ''} />

            <button
                type="button"
                onClick={toggle}
                className="w-full flex items-center justify-between rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm font-medium text-text-main hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
                <span className="flex items-center gap-2 truncate">
                    {selected ? (
                        <>
                            {selected.icon && (
                                <span className="material-symbols-outlined">{selected.icon}</span>
                            )}
                            <span className="truncate">{selected.label}</span>
                        </>
                    ) : (
                        <span className="truncate text-text-muted">{placeholder}</span>
                    )}
                </span>
                <span className="material-symbols-outlined">expand_more</span>
            </button>

            {open && (
                <ul className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-auto">
                    {options.map(opt => (
                        <li
                            key={opt.value}
                            onClick={() => onSelect(opt)}
                            className="px-3 py-2 flex items-center hover:bg-gray-100 cursor-pointer"
                        >
                            <span className="flex items-center gap-2">
                                {selected?.value === opt.value && (
                                    <span className="material-symbols-outlined">check</span>
                                )}
                                {opt.icon && (
                                    <span className="material-symbols-outlined">{opt.icon}</span>
                                )}
                                <span>{opt.label}</span>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
