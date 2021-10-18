import { Body, Controller, Get, Post } from '@nestjs/common';
import { ErrorException } from 'src/filters/error.exceptions';
import { translationDto } from './translation.dto';
import { TranslationsService } from './translations.service';

@Controller()
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Get('getTranslatables')
  async avalableForTranslation() {
    return this.translationsService.getTranslatables();
  }

  @Post('translation')
  async createTranslation(@Body() body: translationDto) {
    try {
      return this.translationsService.createNewTranslation(body);
    } catch (err) {
      new ErrorException();
    }
  }
}
