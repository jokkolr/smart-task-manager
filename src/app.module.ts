import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';  // 👈 Import the Auth module

@Module({
  imports: [
    UsersModule,  // 👈 Users module we made earlier
    AuthModule,   // 👈 Auth module we just created
  ],
})
export class AppModule {}
