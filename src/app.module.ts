import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerplexityService } from './perplexity/perplexity.service';
import { PerplexityController } from './perplexity/perplexity.controller';
import { PerplexityModule } from './perplexity/perplexity.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: +(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASS ?? 'postgres',
      database: process.env.DB_NAME ?? 'tbbchat_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PerplexityModule,
  ],
  providers: [PerplexityService],
  controllers: [PerplexityController],
  
})
export class AppModule {}
