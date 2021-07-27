import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/users/users.module';
import { UserService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
// import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    // JwtModule.register({
    //   secret: String(process.env.SECRET_JWT),
    //   signOptions: { expiresIn: '10h' },
    // }),
    JwtModule.registerAsync({
      // imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        signOptions: { expiresIn: '1h' },
        secret: configService.get('SECRET_JWT'),
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
