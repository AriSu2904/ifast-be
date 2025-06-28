import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import ENV from './config';
@Module({
  imports: [AuthModule, MongooseModule.forRoot(ENV.DB.URI ?? 'mongodb://localhost/example')],
  controllers: [],
  providers: [],
})
export class AppModule {}
