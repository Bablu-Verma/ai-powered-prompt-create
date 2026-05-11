export interface AiProvider {
  id: string;
  name: string;
  url: string;
}

export const AI_PROVIDERS: AiProvider[] = [
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com/' },
  { id: 'deepseek', name: 'DeepSeek', url: 'https://chat.deepseek.com/' },
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/' },
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/' },
  { id: 'grok', name: 'Grok', url: 'https://grok.com/' },
  { id: 'perplexity', name: 'Perplexity', url: 'https://www.perplexity.ai/' },
  { id: 'arena.ai', name: 'Arena.Ai', url: 'https://arena.ai/text/direct' },
];

export const DEFAULT_PROVIDER_ID = 'chatgpt';
