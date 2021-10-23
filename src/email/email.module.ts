import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginKeys } from 'src/entities/loginKeys.entity';
import { ResetPasswordKeys } from 'src/entities/resetPasswordKeys.entity';
import {
  EmailVerified,
  EmailVerifiedSchema,
} from 'src/schemas/emailVerified.schema';
import { TranslationsModule } from 'src/translations/translations.module';
import { UserModule } from 'src/users/users.module';
import { EmailService } from './email.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([LoginKeys, ResetPasswordKeys]),
    TranslationsModule,
    MongooseModule.forFeature([
      { name: EmailVerified.name, schema: EmailVerifiedSchema },
    ]),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
