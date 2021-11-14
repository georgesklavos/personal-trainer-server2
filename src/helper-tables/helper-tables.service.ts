import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { ExerciseModes } from 'src/entities/exerciseModes.entity';
import { ExerciseOptions } from 'src/entities/exerciseOptions.entity';
import { Genders } from 'src/entities/genders.entity';
import { Languages } from 'src/entities/languages.entity';
import { Levels } from 'src/entities/levels.entity';
import { Programs } from 'src/entities/programs.entity';
import { Roles } from 'src/entities/roles.entity';
import { Systems } from 'src/entities/systems.entity';
import { Targets } from 'src/entities/targets.entity';
import { TranslationsService } from 'src/translations/translations.service';
import { Repository } from 'typeorm';

@Injectable()
export class HelperTablesService {
  constructor(
    @InjectRepository(ExerciseModes)
    private exerciseModesRepository: Repository<ExerciseModes>,
    @InjectRepository(ExerciseOptions)
    private exerciseOptionsRepository: Repository<ExerciseOptions>,
    @InjectRepository(Genders)
    private gendersRepository: Repository<Genders>,
    @InjectRepository(Languages)
    private languagesRepository: Repository<Languages>,
    @InjectRepository(Levels)
    private levelsRepository: Repository<Levels>,
    @InjectRepository(Programs)
    private programsRepository: Repository<Programs>,
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
    @InjectRepository(Systems)
    private systemsRepository: Repository<Systems>,
    @InjectRepository(Targets)
    private targestRepository: Repository<Targets>,
    private translationService: TranslationsService,
  ) {}
  helperTablesToSeach = [
    this.exerciseModesRepository,
    this.exerciseOptionsRepository,
    this.gendersRepository,
    this.languagesRepository,
    this.levelsRepository,
    this.programsRepository,
    this.rolesRepository,
    this.systemsRepository,
    this.targestRepository,
  ];
  async getHelperTables(spesificHelperTables: Array<any>, languageId) {
    try {
      const helperTables = {};
      if (spesificHelperTables.length > 0) {
        await Promise.all(
          spesificHelperTables.map(async (el) => {
            helperTables[el.name] = await el.find();
          }),
        );
      } else {
        await Promise.all(
          this.helperTablesToSeach.map(async (el) => {
            helperTables[el.target['name']] = await el.find();
          }),
        );
      }

      const keys = Object.keys(helperTables);
      await Promise.all(
        keys.map(async (el) => {
          const translations = await this.translationService.getTranslation({
            type: el,
            languageId,
          });
          translations.forEach((translation) => {
            const index = helperTables[el].findIndex(
              (helperValue) => helperValue.id == translation.reference,
            );
            if (index != -1) {
              helperTables[el][index].value = translation.value;
            }
          });
        }),
      );

      return helperTables;
    } catch (err) {
      console.log(err);
    }
  }
}
