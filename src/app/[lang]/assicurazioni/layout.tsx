import type { Metadata } from "next";
import { SiteProvider } from '@/lib/SiteContext';
import AssicurazioniClientLayout from "./AssicurazioniClientLayout";

export const metadata: Metadata = {
    title: "JB Agency | Assicurazioni e Consulenza Elite",
    description: "Soluzioni assicurative su misura e consulenza strategica per la protezione del patrimonio e la crescita del business a Gallarate.",
};

export default function AssicurazioniLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SiteProvider site="assicurazioni">
            <AssicurazioniClientLayout>{children}</AssicurazioniClientLayout>
        </SiteProvider>
    );
}
