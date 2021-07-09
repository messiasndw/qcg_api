import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { CompaniesModule } from 'src/companies/companies.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    UsersModule,
    EventsModule,
    PassportModule,
    CompaniesModule,
    JwtModule.register({
      secret: "APP_SECRET",
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
