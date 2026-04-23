"use client";

import React, { createContext, useContext } from 'react';
import type { SiteKey } from './siteConfig';

interface SiteContextType {
  site: SiteKey;
}

const SiteContext = createContext<SiteContextType>({ site: 'group' });

export const SiteProvider: React.FC<{ site: SiteKey; children: React.ReactNode }> = ({
  site,
  children,
}) => (
  <SiteContext.Provider value={{ site }}>
    {children}
  </SiteContext.Provider>
);

export const useSite = (): SiteKey => useContext(SiteContext).site;
