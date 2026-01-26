import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <main className={cn(
            "flex-1 w-full"
        )}>
            {children}
        </main>
    );
};

export default Layout;
