import { Module } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';
import { MulterModule } from '@nestjs/platform-express';
import { Options } from 'multer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class FileUploadModule {}
