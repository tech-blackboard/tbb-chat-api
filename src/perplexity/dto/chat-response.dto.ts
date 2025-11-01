import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ChatResponseDto {
  @ApiProperty({
    description: 'Indicates if the request was successful',
    example: true,
  })
  ok: boolean;

  @ApiPropertyOptional({
    description: 'AI-generated response content',
    example: 'Recent developments in AI include advancements in large language models...',
  })
  completion?: string;

  @ApiPropertyOptional({
    description: 'Source citations for the response',
    example: ['https://example.com/article1', 'https://example.com/article2'],
    type: [String],
  })
  citations?: string[];

  @ApiPropertyOptional({
    description: 'Error message if request failed',
    example: 'API key is invalid',
  })
  error?: string;

  @ApiPropertyOptional({
    description: 'Model used for generation',
    example: 'sonar-pro',
  })
  model?: string;

  @ApiPropertyOptional({
    description: 'Total tokens used',
    example: 250,
  })
  tokensUsed?: number;
}
