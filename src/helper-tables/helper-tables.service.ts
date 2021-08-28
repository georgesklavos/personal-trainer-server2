import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseModes } from 'src/entities/exerciseModes.entity';
import { ExerciseOptions } from 'src/entities/exerciseOptions.entity';
import { Genders } from 'src/entities/genders.entity';
import { Languages } from 'src/entities/languages.entity';
import { Levels } from 'src/entities/levels.entity';
import { Programs } from 'src/entities/programs.entity';
import { Roles } from 'src/entities/roles.entity';
import { Systems } from 'src/entities/systems.entity';
import { Targets } from 'src/entities/targets.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HelperTablesService {
  constructor(
    @InjectRepository(ExerciseModes)
    private readonly exerciseModesRepository: Repository<ExerciseModes>,
    @InjectRepository(ExerciseOptions)
    private readonly exerciseOptionsRepository: Repository<ExerciseOptions>,
    @InjectRepository(Genders)
    private readonly gendersRepository: Repository<Genders>,
    @InjectRepository(Languages)
    private readonly languagesRepository: Repository<Languages>,
    @InjectRepository(Levels)
    private readonly levelsRepository: Repository<Levels>,
    @InjectRepository(Programs)
    private readonly programsRepository: Repository<Programs>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    @InjectRepository(Systems)
    private readonly systemsRepository: Repository<Systems>,
    @InjectRepository(Targets)
    private readonly targestRepository: Repository<Targets>,
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
  async getHelperTables(spesificHelperTables: Array<any>) {
    // eslint-disable-next-line prefer-const
    let helperTables = {};
    if (spesificHelperTables.length > 0) {
      await Promise.all(
        spesificHelperTables.map(async (el) => {
          helperTables[el.metadata.tableName] = await el.find();
        }),
      );
    } else {
      await Promise.all(
        this.helperTablesToSeach.map(async (el) => {
          helperTables[el.metadata.tableName] = await el.find();
        }),
      );
    }

    return helperTables;
  }
}
