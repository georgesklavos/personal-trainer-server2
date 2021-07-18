import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainerController } from './trainer/trainer.controller';
import { TrainerModule } from './trainer/trainer.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { MutualModule } from './mutual/mutual.module';
import { OwnerModule } from './owner/owner.module';
import { OwnerTrainerModule } from './owner-trainer/owner-trainer.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: process.env.DB_SYNC == 'true' ? true : false,
    }),
    AuthModule,
    UserModule,
    PassportModule,
    TrainerModule,
    AdminModule,
    ClientModule,
    MutualModule,
    OwnerModule,
    OwnerTrainerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
