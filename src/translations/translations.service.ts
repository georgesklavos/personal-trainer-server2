import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Languages } from 'src/entities/languages.entity';
import { customErrorMessage } from 'src/filters/error.exceptions';
import {
  EmailVerified,
  EmailVerifiedDocument,
} from 'src/schemas/emailVerified.schema';
import {
  Connection,
  getMongoManager,
  MongoRepository,
  Repository,
} from 'typeorm';
import { translations } from './availableTranslations';
import { getTranslationDto } from './getTranslation.dto';
import { translationDto } from './translation.dto';

@Injectable()
export class TranslationsService {
  constructor(
    // @InjectRepository(EmailVerified, process.env.MONGODB_CONNECTION)
    // private readonly EmailVerifiedRepository: Repository<EmailVerified>,
    @InjectModel(EmailVerified.name)
    private emailVerifiedModel: Model<EmailVerifiedDocument>,
    @InjectRepository(Languages)
    private readonly languagesRepository: Repository<Languages>,
  ) {}

  getTranslatables() {
    const translationStrings = [];
    translations.forEach((el) => {
      translationStrings.push(el.name);
    });
    return translationStrings;
  }

  private validateTranslatable(translatable) {
    const checkTranslatable = translations.find(
      (el) => el.name == translatable,
    );

    if (!checkTranslatable) {
      throw new customErrorMessage(
        'Translatable is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
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
    this.validateTranslatable(translationObject.translation);
    const model = this.findTranslatableClass(translationObject.translation);
    const language = await this.validateLanguage(
      translationObject.data.languageId,
    );

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
