import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginKeys } from 'src/entities/loginKeys.entity';
import { ResetPasswordKeys } from 'src/entities/resetPasswordKeys.entity';
import { EmailVerified } from 'src/schemas/emailVerified.schema';
// import { EmailVerifiedSchema } from 'src/schemas/emailVerified.schema';
import { UserModule } from 'src/users/users.module';
import { EmailService } from './email.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([LoginKeys, ResetPasswordKeys]),
    // TypeOrmModule.forFeature([EmailVerified], 'mongodbConnection'),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {
  constructor() {
    console.log(process.env.MONGODB_CONNECTION);
  }
}
