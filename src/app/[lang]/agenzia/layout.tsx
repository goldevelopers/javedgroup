import type { Metadata } from "next";
import { SiteProvider } from '@/lib/SiteContext';
import AgenziaClientLayout from "./AgenziaClientLayout";

export const metadata: Metadata = {
    title: "Agenzia Javed | CAF, Patronato e Servizi Amministrativi",
    description: "Supporto professionale per pratiche amministrative, fiscali e previdenziali a Gallarate. CAF e Patronato di fiducia.",
};

export default function AgenziaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SiteProvider site="agenzia">
            <AgenziaClientLayout>{children}</AgenziaClientLayout>
        </SiteProvider>
    );
}
