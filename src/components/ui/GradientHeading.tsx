import { cn } from "@/core/utils";
import React from "react";

interface GradientHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    children: React.ReactNode;
}

export function GradientHeading({
    as: Component = "h1",
    className,
    children,
    ...props
}: GradientHeadingProps) {
    return (
        <Component
            className={cn(
                "font-bold bg-clip-text text-transparent bg-primary-gradient animate-gradient-x text-balance",
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}
