import { ReactNode } from "react";
import NavbarRoot from "@/components/NavbarRoot";

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <NavbarRoot />
            {children}
        </div>
    );
}

export default RootLayout;