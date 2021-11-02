import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtAuthGaurd } from 'src/auth/jwt.auth.gaurd';
import { IsClient } from 'src/guards/isClient.guard';
import { VideosService } from './videos.service';

@Controller('video')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @ApiTags('Client')
  @ApiOkResponse({ description: 'Video upload' })
  @UseGuards(JwtAuthGaurd, IsClient)
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
