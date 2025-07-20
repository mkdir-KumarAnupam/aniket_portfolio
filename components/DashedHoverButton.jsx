"use client";

import React from "react";
import Link from "next/link";

const DashedHoverButton = ({ children, className = "", href = "", ...props }) => {
    return (
        <Link href={href} {...props}>
            <a
                className={`inline-block cursor-pointer group relative px-6 py-2 font-medium transition-colors duration-[400ms] 
                ${className}`}
            >
                <span className="relative z-10">{children}</span>

                {/* Borders */}
                <span className="absolute left-0 top-0 h-[2px] w-0 bg-current transition-all duration-100 group-hover:w-full" />
                <span className="absolute right-0 top-0 h-0 w-[2px] bg-current transition-all delay-100 duration-100 group-hover:h-full" />
                <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-current transition-all delay-200 duration-100 group-hover:w-full" />
                <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-current transition-all delay-300 duration-100 group-hover:h-full" />
            </a>
        </Link>
    );
};

export default DashedHoverButton;
