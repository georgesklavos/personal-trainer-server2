import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EmailVerified,
  EmailVerifiedSchema,
} from 'src/schemas/emailVerifiedTranslations.schema';
import { TranslationsService } from './translations.service';
import { TranslationsController } from './translations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Languages } from 'src/entities/languages.entity';
import {
  ExerciseModes,
  ExerciseModesSchema,
} from 'src/schemas/exerciseModeTranslations.schema';
import {
  ExerciseOptions,
  ExericseOptionsSchema,
} from 'src/schemas/exerciseOptionTranslations.schema';
import { Genders, GendersSchema } from 'src/schemas/genderTranslations.schema';
import { Levels, LevelsSchema } from 'src/schemas/levelTranslations.schema';
import {
  Programs,
  ProgramsSchema,
} from 'src/schemas/programTranslations.schema';
import {
  ResetPassword,
  ResetPasswordSchema,
} from 'src/schemas/resetPasswordTranslations.schema';
import { Roles, RolesSchema } from 'src/schemas/roleTranslations.schema';
import { Systems, SystemsSchema } from 'src/schemas/systemTranslations.schema';
import { Targets, TargetsSchema } from 'src/schemas/targetTranslations.schema';
import { ExerciseModes as ExerciseModesEntity } from 'src/entities/exerciseModes.entity';
import { ExerciseOptions as ExerciseOptionsEntity } from 'src/entities/exerciseOptions.entity';
import { Genders as GendersEntity } from 'src/entities/genders.entity';
import { Levels as LevelsEntity } from 'src/entities/levels.entity';
import { Programs as ProgramsEntity } from 'src/entities/programs.entity';
import { Roles as RolesEntity } from 'src/entities/roles.entity';
import { Systems as SystemsEntity } from 'src/entities/systems.entity';
import { Targets as TargetsEntity } from 'src/entities/targets.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Languages,
      ExerciseModesEntity,
      ExerciseOptionsEntity,
      GendersEntity,
      LevelsEntity,
      ProgramsEntity,
      RolesEntity,
      SystemsEntity,
      TargetsEntity,
    ]),
    MongooseModule.forFeature([
      { name: EmailVerified.name, schema: EmailVerifiedSchema },
      { name: ExerciseModes.name, schema: ExerciseModesSchema },
      { name: ExerciseOptions.name, schema: ExericseOptionsSchema },
      { name: Genders.name, schema: GendersSchema },
      { name: Levels.name, schema: LevelsSchema },
      { name: Programs.name, schema: ProgramsSchema },
      { name: ResetPassword.name, schema: ResetPasswordSchema },
      { name: Roles.name, schema: RolesSchema },
      { name: Systems.name, schema: SystemsSchema },
      { name: Targets.name, schema: TargetsSchema },
    ]),
  ],
  providers: [TranslationsService],
  controllers: [TranslationsController],
  exports: [TranslationsService],
})
export class TranslationsModule {}
