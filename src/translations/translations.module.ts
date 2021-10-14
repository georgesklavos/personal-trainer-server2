import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerified } from 'src/schemas/emailVerified.schema';
import { TranslationsService } from './translations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailVerified], process.env.MONGODB_CONNECTION),
  ],
  providers: [TranslationsService],
})
export class TranslationsModule {}
