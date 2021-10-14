import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { VideosService } from './videos.service';

@Controller('video')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 6000000,
      },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(mp4)$/)) {
          return cb(
            new HttpException(
              'Only mp4 files are accepted',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        cb(null, true);
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          //Calling the callback passing the random name generated with the original extension name
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadVideo(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
