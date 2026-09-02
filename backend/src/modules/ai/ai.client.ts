import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { AiClientError } from '../../errors/index.ts';

export class AiClient {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || '';
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL_NAME || '' });
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      return result.response.text();
    } catch (error: unknown) {
      throw new AiClientError('Failed to generate content with AI');
    }
  }
}

export const aiClient = new AiClient();
