import OpenAI from 'openai';
import { env } from '../../config/env';

const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
export async function generateInsight(prompt: string) {
  const completion = await client.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [{ role: 'system', content: 'You are STEADY. Offer supportive financial commentary without legal/medical claims.' }, { role: 'user', content: prompt }]
  });
  return completion.choices[0]?.message?.content ?? '';
}
