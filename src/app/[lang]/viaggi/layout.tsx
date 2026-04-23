import type { Metadata } from "next";
import { SiteProvider } from '@/lib/SiteContext';
import ViaggiClientLayout from "./ViaggiClientLayout";

export const metadata: Metadata = {
    title: "Javed Viaggi | Esplora il Mondo con Noi",
    description: "Biglietteria aerea, visti, pacchetti vacanze e consulenza viaggi a Gallarate. La tua avventura inizia qui.",
};

export default function ViaggiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SiteProvider site="viaggi">
            <ViaggiClientLayout>{children}</ViaggiClientLayout>
        </SiteProvider>
    );
}
