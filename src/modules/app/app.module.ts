import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfiguration } from 'src/configuration/database.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(DatabaseConfiguration.get()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
