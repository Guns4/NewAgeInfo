import { cn } from "@/core/utils";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            id="bento-grid-container"
            className={cn(
                "grid auto-rows-[18rem] md:auto-rows-[20rem] grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoCard = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "row-span-1 rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none bg-slate-950 dark:bg-black dark:border-white/[0.2] border-white/10 border justify-between flex flex-col space-y-4 overflow-hidden relative",
                className
            )}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover/bento:opacity-100 transition duration-500 pointer-events-none" />

            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl relative z-10">
                {header}
            </div>
            {(title || description || icon) && (
                <div className="group-hover/bento:translate-x-2 transition duration-200 relative z-10 p-4">
                    {icon}
                    <div className="font-bold text-slate-100 dark:text-neutral-200 mb-2 mt-2">
                        {title}
                    </div>
                    <div className="font-normal text-slate-300 dark:text-neutral-300 text-xs line-clamp-3">
                        {description}
                    </div>
                </div>
            )}
        </div>
    );
};
