import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationsService } from './translations.service';
import { TranslationsController } from './translations.controller';
import { Languages } from 'src/entities/languages.entity';
import { LanguagesTs } from 'src/entities/languagesTr.entity';
import { ExerciseModesTs } from 'src/entities/exerciseModesTr.entity';
import { ExerciseOptionsTs } from 'src/entities/exerciseOptionsTr.entity';
import { GendersTs } from 'src/entities/gendersTr.entity';
import { LevelsTs } from 'src/entities/levelsTr.entity';
import { ProgramsTs } from 'src/entities/programsTr.entity';
import { RolesTs } from 'src/entities/rolesTr.entity';
import { SystemsTs } from 'src/entities/systemsTr.entity';
import { TargetsTs } from 'src/entities/targetsTr.entity';
import { ResetPasswordTs } from 'src/entities/resetPasswordsTr.entity';
import { EmailVerifiedTs } from 'src/entities/emailVerifiedTr.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Languages,
      ExerciseModesTs,
      ExerciseOptionsTs,
      GendersTs,
      LevelsTs,
      ProgramsTs,
      RolesTs,
      SystemsTs,
      TargetsTs,
      LanguagesTs,
      ResetPasswordTs,
      EmailVerifiedTs,
    ]),
  ],
  providers: [TranslationsService],
  controllers: [TranslationsController],
  exports: [TranslationsService],
})
export class TranslationsModule {}
