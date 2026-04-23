import type { Metadata } from "next";
import { SiteProvider } from '@/lib/SiteContext';
import KiwiClientLayout from "./KiwiClientLayout";

export const metadata: Metadata = {
    title: "Autoscuole Kiwi | La tua Patente a Gallarate",
    description: "Consegui la tua patente A, B, C, D e nautica con istruttori esperti e metodi d'insegnamento all'avanguardia a Gallarate.",
};

export default function KiwiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SiteProvider site="kiwi">
            <KiwiClientLayout>{children}</KiwiClientLayout>
        </SiteProvider>
    );
}
