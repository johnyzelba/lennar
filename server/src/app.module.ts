import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import configuration from "config/app";
import { PositionModule } from './api/PointPosition/PointPosition.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PositionModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
