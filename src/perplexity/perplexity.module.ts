import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PerplexityService } from './perplexity.service';
import { PerplexityController } from './perplexity.controller';

@Module({
  imports: [ConfigModule],
  providers: [PerplexityService],
  controllers: [PerplexityController],
  exports: [PerplexityService],
})
export class PerplexityModule {}
