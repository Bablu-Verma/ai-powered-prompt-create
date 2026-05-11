'use client';

import { Toaster } from 'sonner';
import { AiProviderWrapper } from '@/contexts/AiProviderContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AiProviderWrapper>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
          },
        }}
      />
    </AiProviderWrapper>
  );
}
