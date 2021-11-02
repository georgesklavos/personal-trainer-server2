import { IsDefined } from 'class-validator';
import { Languages } from 'src/entities/languages.entity';
import { EmailVerified } from 'src/schemas/emailVerifiedTranslations.schema';
import { ResetPassword } from 'src/schemas/resetPasswordTranslations.schema';

export class getTranslationDto {
  @IsDefined()
  type: string;
  @IsDefined()
  languageId: Languages;
}
