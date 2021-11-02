import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGaurd } from 'src/auth/jwt.auth.gaurd';
import { ErrorException } from 'src/filters/error.exceptions';
import { IsTranslator } from 'src/guards/isTranslator.guard';
import { getTranslationDto } from './getTranslation.dto';
import { translationDto } from './translation.dto';
import { TranslationsService } from './translations.service';

@Controller()
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @ApiTags('Translator')
  @ApiOkResponse({ description: 'Get translatables' })
  @UseGuards(JwtAuthGaurd, IsTranslator)
  @Get('getTranslatables')
  async avalableForTranslation() {
    return this.translationsService.getTranslatables();
  }

  @ApiTags('Translator')
  @ApiOkResponse({ description: 'Create translation' })
  @UseGuards(JwtAuthGaurd)
  @Post('translation')
  async createTranslation(@Body() body: translationDto) {
    try {
      return this.translationsService.createNewTranslation(body);
    } catch (err) {
      new ErrorException();
    }
  }

  @ApiTags('Translator')
  @ApiOkResponse({ description: 'Update translation' })
  @UseGuards(JwtAuthGaurd, IsTranslator)
  @Post('translation')
  async updateTranslation(@Body() body: translationDto) {
    try {
      // return this.translationsService.createNewTranslation(body);
    } catch (err) {
      new ErrorException();
    }
  }

  @ApiTags('Translator')
  @ApiOkResponse({ description: 'Get translation' })
  @UseGuards(JwtAuthGaurd, IsTranslator)
  @Get('translation')
  async getTranslation(@Body() body: getTranslationDto) {
    try {
      return this.translationsService.getTranslation(body);
    } catch (err) {
      new ErrorException();
    }
  }
}
