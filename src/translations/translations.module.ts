import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EmailVerified,
  EmailVerifiedSchema,
} from 'src/schemas/emailVerified.schema';
import { TranslationsService } from './translations.service';
import { TranslationsController } from './translations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Languages } from 'src/entities/languages.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Languages]),
    MongooseModule.forFeature([
      { name: EmailVerified.name, schema: EmailVerifiedSchema },
    ]),
  ],
  providers: [TranslationsService],
  controllers: [TranslationsController],
  exports: [TranslationsService],
})
export class TranslationsModule {}
