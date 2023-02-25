import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Client, S3, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Controller('s3')
export class S3StorageController {
  constructor(private readonly configService: ConfigService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return file;
  }

  @Delete('/delete/:key')
  async deleteItem(@Param('key') key: string) {
    const s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_SECRET_ACCESS_KEY'),
      },
    });

    return await s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.configService.get('AWS_REGION'),
        Key: key,
      }),
      (err, data) => {
        console.log(err, data);
      },
    );
  }
}
