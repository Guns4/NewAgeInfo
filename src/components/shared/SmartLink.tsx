"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface SmartLinkProps extends LinkProps, PropsWithChildren {
    className?: string;
    prefetchStrategy?: 'viewport' | 'hover';
}

/**
 * A wrapper around Next.js Link that adds aggressive prefetching on hover.
 * Use this for high-priority navigation items (e.g. CTA buttons, main nav).
 */
export function SmartLink({
    children,
    className,
    prefetchStrategy = 'hover',
    ...props
}: SmartLinkProps) {
    const router = useRouter();

    const handleMouseEnter = () => {
        if (prefetchStrategy === 'hover' && typeof props.href === 'string') {
            router.prefetch(props.href);
        }
    };

    return (
        <Link
            {...props}
            className={cn(className)}
            onMouseEnter={handleMouseEnter}
            // Default next/link prefetch is 'viewport' (true) or 'false'. 
            // We keep it enabled but add the hover trigger for faster reaction.
            prefetch={true}
        >
            {children}
        </Link>
    );
}
