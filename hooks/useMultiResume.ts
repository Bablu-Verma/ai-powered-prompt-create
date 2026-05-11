'use client';

import { useState, useCallback } from 'react';

export interface Entry {
  id: string;
  resumeText: string;
  jobDescription: string;
  promptTemplate: string | null;
}

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function useMultiResume() {
  const [entries, setEntries] = useState<Entry[]>([
    { id: generateId(), resumeText: '', jobDescription: '', promptTemplate: null },
  ]);

  const addEntry = useCallback(() => {
    setEntries(prev => [...prev, { id: generateId(), resumeText: '', jobDescription: '', promptTemplate: null }]);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  }, []);

  const setResumeText = useCallback((id: string, value: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, resumeText: value } : e));
  }, []);

  const setJobDescription = useCallback((id: string, value: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, jobDescription: value } : e));
  }, []);

  const setPromptTemplate = useCallback((id: string, value: string | null) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, promptTemplate: value } : e));
  }, []);

  return { entries, addEntry, removeEntry, setResumeText, setJobDescription, setPromptTemplate };
}
