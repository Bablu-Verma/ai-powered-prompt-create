'use client';

import { Brain, Globe } from 'lucide-react';

export default function Header() {


  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">ResumeAI</span>
          </div>
          <nav className="flex items-center gap-6">
           
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Home</a>
            <a href="#entries" className="text-sm text-gray-400 hover:text-white transition-colors">Entries</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
