'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Loader2, ExternalLink, Trash2, Copy, Edit3, X as XIcon, Check } from 'lucide-react';
import { toast } from 'sonner';
import { buildPrompt, DEFAULT_TEMPLATE } from '@/utils/promptBuilder';
import type { Entry } from '@/hooks/useMultiResume';
import { useAiProvider } from '@/contexts/AiProviderContext';

interface ResumeEntryProps {
  entry: Entry;
  onResumeTextChange: (id: string, value: string) => void;
  onJobDescriptionChange: (id: string, value: string) => void;
  onRemove: (id: string) => void;
  onPromptTemplateChange: (id: string, value: string | null) => void;
}

export default function ResumeEntry({ entry, onResumeTextChange, onJobDescriptionChange, onRemove, onPromptTemplateChange }: ResumeEntryProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editTemplate, setEditTemplate] = useState('');
  const { selectedProvider } = useAiProvider();

  const openEditor = () => {
    setEditTemplate(entry.promptTemplate || DEFAULT_TEMPLATE);
    setShowEditor(true);
  };

  const saveTemplate = () => {
    if (editTemplate.trim() === DEFAULT_TEMPLATE.trim()) {
      onPromptTemplateChange(entry.id, null);
    } else {
      onPromptTemplateChange(entry.id, editTemplate);
    }
    setShowEditor(false);
    toast.success('Prompt template saved');
  };

  const resetTemplate = () => {
    setEditTemplate(DEFAULT_TEMPLATE);
  };

  const hasCustom = entry.promptTemplate !== null;

  const handleGenerate = async () => {
    if (!entry.resumeText && !entry.jobDescription) {
      toast.error('Please enter a resume or paste a job description');
      return;
    }

    setIsGenerating(true);

    try {
      const prompt = buildPrompt(
        { resumeText: entry.resumeText, jobDescription: entry.jobDescription },
        entry.promptTemplate || undefined
      );

      await navigator.clipboard.writeText(prompt);

      toast.success('Prompt copied to clipboard!', {
        description: `Opening ${selectedProvider.name}...`,
        icon: <Copy className="w-4 h-4" />,
      });

      setTimeout(() => {
        window.open(selectedProvider.url, '_blank');
        setIsGenerating(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate prompt. Please try again.');
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-white/10 rounded-2xl p-6 space-y-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-primary" />
          </div>
          <div className="flex gap-8  items-center">
            <h3 className="text-white font-semibold">Entry {entry.id.slice(0, 4)}</h3>
            <button
              onClick={() => onRemove(entry.id)}
              className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-gray-400 hover:text-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <button
          onClick={openEditor}
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-primary transition-colors"
        >
          <Edit3 className="w-3 h-3" />
          {hasCustom ? 'Edit Prompt Template' : 'Edit Default Prompt'}
        </button>
      </div>


        {showEditor && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border border-white/10 rounded-xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 bg-surface border-b border-white/10">
            <span className="text-sm text-gray-300 font-medium">Prompt Template</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Use {'{RESUME_TEXT}'} and {'{JOB_DESCRIPTION}'} as placeholders</span>
              <button
                onClick={resetTemplate}
                className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5"
              >
                Reset
              </button>
              <button
                onClick={() => setShowEditor(false)}
                className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <XIcon className="w-4 h-4" />
              </button>
              <button
                onClick={saveTemplate}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white rounded-lg bg-primary hover:bg-primary-dark transition-colors"
              >
                <Check className="w-3 h-3" />
                Save
              </button>
            </div>
          </div>
          <textarea
            value={editTemplate}
            onChange={(e) => setEditTemplate(e.target.value)}
            className="w-full h-64 bg-surface p-4 text-white text-sm font-mono placeholder-gray-500 resize-none focus:outline-none"
          />
        </motion.div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-gray-400">Resume Text</label>
         
        </div>
        <textarea
          value={entry.resumeText}
          onChange={(e) => onResumeTextChange(entry.id, e.target.value)}
          placeholder="Paste your full resume text here..."
          className="w-full h-56 bg-surface border border-white/10 rounded-xl p-3 text-white text-sm placeholder-gray-500 resize-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200"
        />
      </div>

      

      <div>
        <label className="text-sm text-gray-400 mb-2 block">Job Description</label>
        <textarea
          value={entry.jobDescription}
          onChange={(e) => onJobDescriptionChange(entry.id, e.target.value)}
          placeholder="Paste job description here..."
          className="w-full h-56 bg-surface border border-white/10 rounded-xl p-3 text-white text-sm placeholder-gray-500 resize-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200"
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={(!entry.resumeText && !entry.jobDescription) || isGenerating}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-primary hover:bg-primary-dark"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4" />
            <span>Generate Prompt</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </>
        )}
      </button>

    
    </motion.div>
  );
}
