"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ConditionalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Strip the leading /{lang} segment to get the route path
  // e.g. /it/agenzia/services -> /agenzia/services
  // e.g. /en -> /
  const routePath = pathname.replace(/^\/(it|en|ur)(\/|$)/, '/');

  // Routes that have their own headers/footers
  const divisionalRoutes = ['/viaggi', '/agenzia', '/kiwi', '/assicurazioni'];

  const isDivisional = divisionalRoutes.some(route => routePath.startsWith(route));

  if (isDivisional) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
