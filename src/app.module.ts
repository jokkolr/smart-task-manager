import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';  // 👈 Import our new module

@Module({
  imports: [UsersModule],  // 👈 Tell Nest to use the Users module
})
export class AppModule {}
