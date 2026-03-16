export const MODELS = [
  { label: 'GPT-4o Mini (Most Stable)', value: 'gpt-4o-mini' },
  { label: 'GPT-4o', value: 'gpt-4o' },
  { label: 'Claude Haiku', value: 'claude-3-5-haiku' },
  { label: 'Llama 3.3 70B (Free)', value: 'openrouter:meta-llama/llama-3.3-70b-instruct:free' },
  { label: 'DeepSeek R1 (Free)', value: 'openrouter:deepseek/deepseek-r1:free' },
  { label: 'Gemini 2.0 Flash (Free)', value: 'openrouter:google/gemini-2.0-flash-exp:free' },
]

export const DEFAULT_MODEL = MODELS[0].value
export const MAX_TOKENS = 1024