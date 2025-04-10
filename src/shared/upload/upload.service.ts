import { Injectable } from '@nestjs/common';
import { IFile } from './interfaces/file.interface';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: IFile): Promise<any> {
    try {
      if (file) {
        const tempFilePath = path.join(
          __dirname,
          '..',
          'uploads',
          file?.originalname,
        );
        fs.mkdirSync(path.dirname(tempFilePath), { recursive: true });
        fs.writeFileSync(tempFilePath, file.buffer);
        const result = await cloudinary.uploader.upload(tempFilePath, {
          folder: 'your_folder_name',
        });
        fs.unlinkSync(tempFilePath);
        return result.secure_url;
      }
    } catch (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }
}
