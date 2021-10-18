import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainerModule } from './trainer/trainer.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/clients.module';
import { MutualModule } from './mutual/mutual.module';
import { OwnerModule } from './owner/owner.module';
import { OwnerTrainerModule } from './owner-trainer/owner-trainer.module';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import * as ormconfig from '../ormconfig';
import { LoginInformationModule } from './login-information/login-information.module';
import { HelperTablesModule } from './helper-tables/helper-tables.module';
import { PaymentsModule } from './payments/payments.module';
import { HowYouFeelModule } from './how-you-feel/how-you-feel.module';
import { ExercisesModule } from './exercises/exercises.module';
import { DaysModule } from './days/days.module';
import { SupportModule } from './support/support.module';
import { LoggerRequestsMiddleware } from './middleware/requests.middleware';
import { VideosModule } from './videos/videos.module';
import { MessagesModule } from './messages/messages.module';
import { EmailModule } from './email/email.module';
import { TranslationsModule } from './translations/translations.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    // TypeOrmModule.forRoot(ormconfig.ormconfigMongoDB),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/personal-trainer-two'),
    TypeOrmModule.forRoot(ormconfig.ormconfigMySQL),
    AuthModule,
    OwnerModule,
    UserModule,
    PassportModule,
    TrainerModule,
    AdminModule,
    ClientModule,
    MutualModule,
    OwnerTrainerModule,
    LoginInformationModule,
    HelperTablesModule,
    PaymentsModule,
    HowYouFeelModule,
    ExercisesModule,
    DaysModule,
    SupportModule,
    VideosModule,
    MessagesModule,
    EmailModule,
    TranslationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerRequestsMiddleware).forRoutes('*');
  }
}
