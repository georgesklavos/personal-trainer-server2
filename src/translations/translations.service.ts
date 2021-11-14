import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Languages } from 'src/entities/languages.entity';
import { customErrorMessage } from 'src/filters/error.exceptions';
import {
  Connection,
  getManager,
  getMongoManager,
  MongoRepository,
  Repository,
} from 'typeorm';
// import { systemTranslations } from './availableSystemTranslations';
import { translations } from './availableTranslations';
import { getTranslationDto } from './getTranslation.dto';
import { translationDto } from './translation.dto';
import { ExerciseModesTs } from 'src/entities/exerciseModesTr.entity';
import { ExerciseOptionsTs } from 'src/entities/exerciseOptionsTr.entity';
import { GendersTs } from 'src/entities/gendersTr.entity';
import { LevelsTs } from 'src/entities/levelsTr.entity';
import { ProgramsTs } from 'src/entities/programsTr.entity';
import { RolesTs } from 'src/entities/rolesTr.entity';
import { SystemsTs } from 'src/entities/systemsTr.entity';
import { TargetsTs } from 'src/entities/targetsTr.entity';
import { EmailVerifiedTs } from 'src/entities/emailVerifiedTr.entity';
import { LanguagesTs } from 'src/entities/languagesTr.entity';
import { ResetPasswordTs } from 'src/entities/resetPasswordsTr.entity';

@Injectable()
export class TranslationsService {
  constructor(
    // @InjectModel(EmailVerified.name)
    // private emailVerifiedModel: Model<EmailVerifiedDocument>,
    @InjectRepository(Languages)
    private readonly languagesRepository: Repository<Languages>,
    @InjectRepository(ExerciseModesTs)
    private readonly ExerciseModesTs: Repository<ExerciseModesTs>,
    @InjectRepository(ExerciseOptionsTs)
    private readonly ExerciseOptionsTs: Repository<ExerciseOptionsTs>,
    @InjectRepository(GendersTs)
    private readonly GendersTs: Repository<GendersTs>,
    @InjectRepository(LevelsTs)
    private readonly LevelsTs: Repository<LevelsTs>,
    @InjectRepository(ProgramsTs)
    private readonly ProgramsTs: Repository<ProgramsTs>,
    @InjectRepository(RolesTs)
    private readonly RolesTs: Repository<RolesTs>,
    @InjectRepository(SystemsTs)
    private readonly SystemsTs: Repository<SystemsTs>,
    @InjectRepository(TargetsTs)
    private readonly TargetsTs: Repository<TargetsTs>,
    @InjectRepository(EmailVerifiedTs)
    private readonly EmailVerifiedTs: Repository<EmailVerifiedTs>,
    @InjectRepository(LanguagesTs)
    private readonly LanguagesTs: Repository<LanguagesTs>,
    @InjectRepository(ResetPasswordTs)
    private readonly ResetPasswordTs: Repository<ResetPasswordTs>,
  ) {}

  getTranslatables() {
    const translationStrings = [];
    translations.forEach((el) => {
      translationStrings.push(el.name);
    });
    return translationStrings;
  }

  // getSystemTranslatables() {
  //   const systemTranslationStrings = [];
  //   systemTranslations.forEach((el) => {
  //     systemTranslationStrings.push(el.name);
  //   });
  //   return systemTranslationStrings;
  // }

  private validateTranslatable(translatable) {
    const checkTranslatable = translations.find(
      (el) => el.name == translatable,
    );

    // const checkSystemTranslatable = systemTranslations.find(
    //   (el) => el.name == translatable,
    // );

    if (!checkTranslatable) {
      throw new customErrorMessage(
        `Translatable ${translatable} is not valid`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return false;
  }

  private findTranslatableClass(translatable) {
    const keys = Object.keys(this);
    let model;
    keys.forEach((el) => {
      if (el) {
        if (el == translatable) {
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
    this.validateTranslatable(translationObject.translation);
    const model = this.findTranslatableClass(translationObject.translation);
    const language = await this.validateLanguage(
      translationObject.data.language,
    );

    const checkTranslation = await getManager()
      .createQueryBuilder(model, 'translation')
      .where('languageId = :id AND referenceId = :refId', {
        id: language,
        refId: translationObject.data['reference'],
      })
      .getOne();
    if (checkTranslation) {
      throw new customErrorMessage(
        'Translation already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    await getManager()
      .createQueryBuilder()
      .insert()
      .into(model)
      .values(translationObject.data)
      .execute();

    //error an iparxei
    //meta kane neo
    //ftiaje genika neos rolos translator
  }

  async getTranslation(data: getTranslationDto): Promise<Array<any>> {
    if (!data.type.includes('Ts')) {
      data.type = data.type + 'Ts';
    }
    this.validateTranslatable(data.type);
    const model = this.findTranslatableClass(data.type);
    const language = await this.validateLanguage(data.languageId);

    let translation = await getManager()
      .createQueryBuilder(model, 'translation')
      .where('languageId = :id', { id: language })
      .getMany();

    if (!translation) {
      translation = await getManager()
        .createQueryBuilder(model, 'translation')
        .where('languageId = :id', { id: 40 })
        .getMany();
    }

    return translation;
  }

  //ftiaje update translation

  async updateTranslation(translationObject: translationDto) {
    this.validateTranslatable(translationObject.translation);
    const model = this.findTranslatableClass(translationObject.translation);
    const language = await this.validateLanguage(
      translationObject.data.language,
    );

    const checkTranslation = await getManager()
      .createQueryBuilder(model, 'translation')
      .where('languageId = :id', { id: language })
      .getOne();
    if (!checkTranslation) {
      throw new customErrorMessage(
        'Translation doesnt exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    await getManager().update(
      model,
      { language: translationObject.data.language },
      translationObject.data,
    );
  }
}
