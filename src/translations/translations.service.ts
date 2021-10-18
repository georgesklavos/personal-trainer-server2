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

  async createNewTranslation(translationObject: translationDto) {
    const translatable = translations.find(
      (el) => el.name == translationObject.translation,
    );

    if (!translatable) {
      throw new customErrorMessage(
        'Translatable is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const keys = Object.keys(this);
    let model;
    keys.forEach((el) => {
      if (this[el]['modelName']) {
        if (this[el]['modelName'] == translationObject.translation) {
          model = el;
        }
      }
    });

    const language = await this.languagesRepository.findOne({
      where: { id: translationObject.data.languageId },
    });

    if (!language) {
      throw new customErrorMessage(
        'Language is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const checkTranslation = await this[model].findOne({
      languageId: translationObject.data.languageId,
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
}
