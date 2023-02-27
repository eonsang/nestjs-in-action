import { Body, Controller, Post } from '@nestjs/common';
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Controller('presign')
export class PresignurlController {
  constructor(private configService: ConfigService) {}

  @Post('/post')
  async presignPost(
    @Body('filename') filename: string,
    @Body('type') type: string,
  ) {
    const client = new S3({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_SECRET_ACCESS_KEY'),
      },
    });

    return await createPresignedPost(client, {
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: filename,
      Conditions: [
        ['content-length-range', 0, 50 * 1000 ** 2],
        // ['starts-with', '$Content-Type', 'image/'],
      ],
      Expires: 600,
    });
  }

  @Post('/url')
  async presignUrl(
    @Body('filename') filename: string,
    @Body('type') type: string,
  ) {
    const client = new S3({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_SECRET_ACCESS_KEY'),
      },
    });

    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: filename,
      ContentType: type,
    });

    return await getSignedUrl(client, command, {
      expiresIn: 3600,
    });
  }
}
