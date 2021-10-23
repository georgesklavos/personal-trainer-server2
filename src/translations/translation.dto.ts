import { Type } from 'class-transformer';
import { IsDefined, IsString, ValidateNested } from 'class-validator';
import { Users } from 'src/entities/users.entity';
import {
  EmailVerified,
  EmailVerifiedSchema,
} from 'src/schemas/emailVerified.schema';
import { ResetPassword } from 'src/schemas/resetPassword.schema';

export class translationDto {
  @IsDefined()
  @IsString()
  translation: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => Object, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'type',
      subTypes: [
        { value: EmailVerified, name: EmailVerified.name },
        { value: ResetPassword, name: ResetPassword.name },
      ],
    },
  })
  data: EmailVerified | ResetPassword;
}
