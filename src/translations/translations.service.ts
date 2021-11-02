import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Languages } from 'src/entities/languages.entity';
import { customErrorMessage } from 'src/filters/error.exceptions';
import {
  EmailVerified,
  EmailVerifiedDocument,
} from 'src/schemas/emailVerifiedTranslations.schema';
import {
  ExerciseModes,
  ExerciseModesDocument,
} from 'src/schemas/exerciseModeTranslations.schema';
import {
  ExerciseOptions,
  ExerciseOptionsDocument,
} from 'src/schemas/exerciseOptionTranslations.schema';
import {
  Genders,
  GendersDocument,
} from 'src/schemas/genderTranslations.schema';
import { Levels, LevelsDocument } from 'src/schemas/levelTranslations.schema';
import {
  Programs,
  ProgramsDocument,
} from 'src/schemas/programTranslations.schema';
import { Roles, RolesDocument } from 'src/schemas/roleTranslations.schema';
import {
  Systems,
  SystemsDocument,
} from 'src/schemas/systemTranslations.schema';
import {
  Targets,
  TargetsDocument,
} from 'src/schemas/targetTranslations.schema';
import {
  Connection,
  getMongoManager,
  MongoRepository,
  Repository,
} from 'typeorm';
import { systemTranslations } from './availableSystemTranslations';
import { translations } from './availableTranslations';
import { getTranslationDto } from './getTranslation.dto';
import { translationDto } from './translation.dto';
import { ExerciseModes as ExerciseModesEntity } from 'src/entities/exerciseModes.entity';
import { ExerciseOptions as ExerciseOptionsEntity } from 'src/entities/exerciseOptions.entity';
import { Genders as GendersEntity } from 'src/entities/genders.entity';
import { Levels as LevelsEntity } from 'src/entities/levels.entity';
import { Programs as ProgramsEntity } from 'src/entities/programs.entity';
import { Roles as RolesEntity } from 'src/entities/roles.entity';
import { Systems as SystemsEntity } from 'src/entities/systems.entity';
import { Targets as TargetsEntity } from 'src/entities/targets.entity';

@Injectable()
export class TranslationsService {
  constructor(
    @InjectModel(EmailVerified.name)
    private emailVerifiedModel: Model<EmailVerifiedDocument>,
    @InjectModel(ExerciseModes.name)
    private exerciseModeModel: Model<ExerciseModesDocument>,
    @InjectModel(ExerciseOptions.name)
    private exerciseOptionModel: Model<ExerciseOptionsDocument>,
    @InjectModel(Genders.name) private genderModel: Model<GendersDocument>,
    @InjectModel(Levels.name) private levelModel: Model<LevelsDocument>,
    @InjectModel(Programs.name) private programModel: Model<ProgramsDocument>,
    @InjectModel(Roles.name) private roleModel: Model<RolesDocument>,
    @InjectModel(Systems.name) private systemModel: Model<SystemsDocument>,
    @InjectModel(Targets.name) private targetModel: Model<TargetsDocument>,
    @InjectRepository(Languages)
    private readonly languagesRepository: Repository<Languages>,
    @InjectRepository(ExerciseModesEntity)
    private readonly exerciseModeRepository: Repository<ExerciseModesEntity>,
    @InjectRepository(ExerciseOptionsEntity)
    private readonly exerciseOptionRepository: Repository<ExerciseOptionsEntity>,
    @InjectRepository(GendersEntity)
    private readonly genderRepository: Repository<GendersEntity>,
    @InjectRepository(LevelsEntity)
    private readonly levelRepository: Repository<LevelsEntity>,
    @InjectRepository(ProgramsEntity)
    private readonly programRepository: Repository<ProgramsEntity>,
    @InjectRepository(RolesEntity)
    private readonly roleRepository: Repository<RolesEntity>,
    @InjectRepository(SystemsEntity)
    private readonly systemRepository: Repository<SystemsEntity>,
    @InjectRepository(TargetsEntity)
    private readonly targetRepository: Repository<TargetsEntity>,
  ) {}

  getTranslatables() {
    const translationStrings = [];
    translations.forEach((el) => {
      translationStrings.push(el.name);
    });
    return translationStrings;
  }

  getSystemTranslatables() {
    const systemTranslationStrings = [];
    systemTranslations.forEach((el) => {
      systemTranslationStrings.push(el.name);
    });
    return systemTranslationStrings;
  }

  private validateTranslatable(translatable) {
    const checkTranslatable = translations.find(
      (el) => el.name == translatable,
    );

    const checkSystemTranslatable = systemTranslations.find(
      (el) => el.name == translatable,
    );

    if (!checkTranslatable && !checkSystemTranslatable) {
      throw new customErrorMessage(
        'Translatable is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (checkSystemTranslatable) {
      return true;
    }

    return false;
  }

  private findTranslatableClass(translatable) {
    const keys = Object.keys(this);
    let model;
    keys.forEach((el) => {
      if (this[el]['modelName']) {
        if (this[el]['modelName'] == translatable) {
          model = el;
        }
      }
    });

    return model;
  }

  private async validateLanguage(languageId) {
    const language = await this.languagesRepository.findOne({
      where: { id: languageId },
    });

    if (!language) {
      throw new customErrorMessage(
        'Language is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    return languageId;
  }

  async createNewTranslation(translationObject: translationDto) {
    const isSystemTranslatable = this.validateTranslatable(
      translationObject.translation,
    );
    const model = this.findTranslatableClass(translationObject.translation);
    const language = await this.validateLanguage(
      translationObject.data.languageId,
    );

    if (isSystemTranslatable) {
      console.log(Object.keys(this));
      console.log('////////////////////////////');
      console.log(model.split('Model')[0] + 'Repository');
    } else {
      const checkTranslation = await this[model].findOne({
        languageId: language,
      });
      if (checkTranslation) {
        throw new customErrorMessage(
          'Translation already exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newTranslation = new this[model](translationObject.data);
      await newTranslation.save();
    }

    //error an iparxei
    //meta kane neo
    //ftiaje genika neos rolos translator
  }

  async getTranslation(data: getTranslationDto) {
    this.validateTranslatable(data.type);
    const model = this.findTranslatableClass(data.type);
    const language = await this.validateLanguage(data.languageId);

    let translation = await this[model].findOne({
      languageId: language,
    });

    if (!translation) {
      translation = await this[model]
        .findOne({
          languageId: 40,
        })
        .select({ createdAt: 0, updatedAt: 0, __v: 0 });
    }

    return translation;
  }
}
