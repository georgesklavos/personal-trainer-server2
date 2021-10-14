import { Injectable } from '@nestjs/common';
import { EmailVerified } from 'src/schemas/emailVerified.schema';
import { getMongoManager } from 'typeorm';

@Injectable()
export class TranslationsService {
  //to item tha einai enum
  async createNewTranslation(item, languageId, data) {
    const manager = getMongoManager();

    const translation = await manager.findOne(item, { where: { languageId } });
    //error an iparxei
    //meta kane neo
    //ftiaje genika neos rolos translator
  }
}
