import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PerplexityService } from './perplexity.service';
import { ChatRequestDto } from './dto/chat.dto';
import { ChatResponseDto } from './dto/chat-response.dto';


@ApiTags('Perplexity AI')
@Controller('api/perplexity')
export class PerplexityController {
  constructor(private readonly perplexityService: PerplexityService) {}
  @Post('chat')
  @ApiOperation({
    summary: 'Chat with Perplexity AI',
    description: 'Send a prompt to Perplexity AI and receive an AI-generated response with citations',
  })
  @ApiBody({
    type: ChatRequestDto,
    description: 'Chat request payload',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response from Perplexity AI',
    type: ChatResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Missing or invalid parameters',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error - API call failed',
  })
  async chat(@Body() chatDto: ChatRequestDto): Promise<ChatResponseDto> {
    const { prompt, systemMessage, model, maxTokens, temperature, stream } = chatDto;

    if (!prompt) {
      throw new HttpException(
        'Missing required field: prompt',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.perplexityService.chat(
      prompt,
      systemMessage,
      model,
      maxTokens,
      temperature,
    );

    if (!result.ok) {
      throw new HttpException(
        result.error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return result as unknown as ChatResponseDto;
  }
}
