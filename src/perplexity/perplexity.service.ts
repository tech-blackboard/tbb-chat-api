import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

interface PerplexityResponse extends OpenAI.Chat.Completions.ChatCompletion {
    citations?: string[];
  }
@Injectable()
export class PerplexityService {
  private client: OpenAI;

  constructor(private configService: ConfigService) {
    this.client = new OpenAI({
      apiKey: this.configService.get<string>('PERPLEXITY_API_KEY'),
      baseURL: this.configService.get<string>('PERPLEXITY_API_BASE_URL'),
    });
  }

  async chat(
    prompt: string,
    systemMessage?: string,
    model?: string,
    maxTokens?: number,
    temperature?: number,
  ) {
    try {
      const messages: any[] = [];
      
      if (systemMessage) {
        messages.push({
          role: 'system',
          content: systemMessage,
        });
      }
      
      messages.push({
        role: 'user',
        content: prompt,
      });

      const response = await this.client.chat.completions.create({
        model: model || this.configService.get<string>('PERPLEXITY_MODEL') || 'sonar',
        messages,
        max_tokens: maxTokens || 1000,
        temperature: temperature || 0.7,
        stream: false,
    }) as PerplexityResponse;

      return {
        ok: true,
        completion: response.choices[0].message?.content,
        citations: response.citations || [],
        model: response.model,
        tokensUsed: response.usage?.total_tokens,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message || 'Failed to query Perplexity API',
      };
    }
  }
}
