'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { AI_PROVIDERS, DEFAULT_PROVIDER_ID } from '@/constants/aiProviders';
import type { AiProvider } from '@/constants/aiProviders';

interface AiProviderContextType {
  selectedProvider: AiProvider;
  setSelectedProviderId: (id: string) => void;
  providers: AiProvider[];
}

const AiProviderContext = createContext<AiProviderContextType | null>(null);

export function AiProviderWrapper({ children }: { children: ReactNode }) {
  const [selectedProvider, setSelectedProvider] = useState<AiProvider>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aiProvider');
      if (saved) {
        const found = AI_PROVIDERS.find(p => p.id === saved);
        if (found) return found;
      }
    }
    return AI_PROVIDERS.find(p => p.id === DEFAULT_PROVIDER_ID) || AI_PROVIDERS[0];
  });

  const setSelectedProviderId = (id: string) => {
    const provider = AI_PROVIDERS.find(p => p.id === id);
    if (provider) {
      setSelectedProvider(provider);
      localStorage.setItem('aiProvider', id);
    }
  };

  return (
    <AiProviderContext.Provider value={{ selectedProvider, setSelectedProviderId, providers: AI_PROVIDERS }}>
      {children}
    </AiProviderContext.Provider>
  );
}

export function useAiProvider() {
  const context = useContext(AiProviderContext);
  if (!context) {
    throw new Error('useAiProvider must be used within an AiProviderWrapper');
  }
  return context;
}
