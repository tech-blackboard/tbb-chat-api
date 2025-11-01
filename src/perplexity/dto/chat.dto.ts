import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, Min, Max } from 'class-validator';

export class ChatRequestDto {
  @ApiProperty({
    description: 'The user prompt or question to send to Perplexity AI',
    example: 'What are the latest developments in AI?',
  })
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @ApiPropertyOptional({
    description: 'System message to guide AI behavior',
    example: 'You are a helpful assistant. Be precise and concise.',
  })
  @IsString()
  @IsOptional()
  systemMessage?: string;

  @ApiPropertyOptional({
    description: 'AI model to use',
    example: 'sonar-pro',
    enum: [ 'sonar-pro', 'sonar', 'sonar-reasoning'],
    default: 'sonar-pro',
  })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiPropertyOptional({
    description: 'Maximum number of tokens to generate',
    example: 1000,
    minimum: 1,
    maximum: 4000,
    default: 1000,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(4000)
  maxTokens?: number;

  @ApiPropertyOptional({
    description: 'Temperature for response randomness (0.0 to 2.0)',
    example: 0.7,
    minimum: 0,
    maximum: 2,
    default: 0.7,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(2)
  temperature?: number;

  @ApiPropertyOptional({
    description: 'Enable streaming response',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  stream?: boolean;
}
