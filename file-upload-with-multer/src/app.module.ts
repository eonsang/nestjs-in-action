import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DistStorageModule } from './diskStorage/distStorage.module';
import { S3StorageModule } from './s3Storage/s3Stroage.module';
import { PresignurlModule } from './presignurl/presignurl.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DistStorageModule,
    S3StorageModule,
    PresignurlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
