'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResumeEntry from '@/components/ResumeEntry';
import { useMultiResume } from '@/hooks/useMultiResume';
import { Plus, ArrowDown, Sparkles } from 'lucide-react';

export default function Home() {
  const { entries, addEntry, removeEntry, setResumeText, setJobDescription, setPromptTemplate } = useMultiResume();

  return (
    <>
      <Header />

      <section className="relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Career Assistant
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Land Your Dream Job<br />With AI Precision
          </h1>
          <p className="mt-5 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Upload your resume, paste a job description, and let AI generate cover letters, 
            ATS analysis, interview prep, and more.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="#entries"
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded-xl bg-primary hover:bg-primary-dark transition-colors"
            >
              Get Started
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="entries" className="py-10 relative flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {entries.map((entry) => (
            <ResumeEntry
              key={entry.id}
              entry={entry}
              onResumeTextChange={setResumeText}
              onJobDescriptionChange={setJobDescription}
              onRemove={removeEntry}
              onPromptTemplateChange={setPromptTemplate}
            />
          ))}

          <button
            onClick={addEntry}
            className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-gray-400 hover:text-primary hover:border-primary/50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add Another Entry</span>
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}
