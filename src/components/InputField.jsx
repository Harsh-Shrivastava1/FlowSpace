import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const InputField = ({ label, type = "text", placeholder, value, onChange, className, required = false }) => {
    return (
        <div className="flex flex-col gap-2 w-full group">
            {label && <label className="text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold ml-1 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors mb-1.5 block">{label}</label>}
            <div className="relative">
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={cn(
                        "w-full px-5 py-4 glass-input outline-none relative z-10 transition-all duration-300",
                        className
                    )}
                />
            </div>
        </div>
    );
};

export default InputField;
