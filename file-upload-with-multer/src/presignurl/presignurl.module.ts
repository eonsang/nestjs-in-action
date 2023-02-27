import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PresignurlController } from './presignurl.controller';

@Module({
  imports: [ConfigModule],
  controllers: [PresignurlController],
  providers: [],
})
export class PresignurlModule {}
