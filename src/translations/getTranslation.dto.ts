import { IsDefined } from 'class-validator';
import { Languages } from 'src/entities/languages.entity';

export class getTranslationDto {
  @IsDefined()
  type: string;
  @IsDefined()
  languageId: Languages;
}
