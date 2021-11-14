import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseModes } from 'src/entities/exerciseModes.entity';
import { ExerciseOptions } from 'src/entities/exerciseOptions.entity';
import { Genders } from 'src/entities/genders.entity';
import { Languages } from 'src/entities/languages.entity';
import { Levels } from 'src/entities/levels.entity';
import { Programs } from 'src/entities/programs.entity';
import { Roles } from 'src/entities/roles.entity';
import { Systems } from 'src/entities/systems.entity';
import { Targets } from 'src/entities/targets.entity';
import { TranslationsModule } from 'src/translations/translations.module';
import { HelperTablesService } from './helper-tables.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExerciseModes,
      ExerciseOptions,
      Genders,
      Languages,
      Levels,
      Programs,
      Roles,
      Systems,
      Targets,
    ]),
    TranslationsModule,
  ],
  providers: [HelperTablesService],
  exports: [HelperTablesService],
})
export class HelperTablesModule {}
